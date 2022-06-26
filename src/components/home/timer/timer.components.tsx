import { useContext, useEffect } from "react";
import Countdown, { CountdownTimeDelta } from "react-countdown";
import { TimerStorageInterface } from "../../../interfaces/item-storage-interface";
import TimerContext from "../../../context/timer-context";
import classes from "./timer.module.scss";
import ringer from "../../../assets/ringtones/win-10.mp3";
import { useDispatch, useSelector } from "react-redux";
import { selectTodoItems } from "../../../store/item/item.selector";
import { updateItemStart } from "../../../store/item/item.action";

const Timer: React.FC = () => {
  const timerCtx = useContext(TimerContext);
  const todoItems = useSelector(selectTodoItems);
  const dispatch = useDispatch();
  const audio = new Audio(ringer);
  audio.loop = false;
  useEffect(() => {
    let timerString = localStorage.getItem("timer");
    let timer: TimerStorageInterface = timerString && JSON.parse(timerString);
    if (!todoItems[0]) {
      timerCtx.onSetDate(null);
      return;
    }
    if (
      todoItems &&
      timer?.modelID &&
      timer?.modelID !== todoItems[0].modelID
    ) {
      localStorage.removeItem("timer");
    }
    if (
      timer &&
      timer.autoStart &&
      timer.endTime &&
      timer.endTime - new Date().getTime() > 0
    ) {
      timerCtx.onSetDate(timer.endTime);
      timerCtx.onSetAutoStart(timer.autoStart);
      timerCtx.onSetIsPaused(false);
      timerCtx.onSetIsStarted(true);
    } else if (timer && !timer.autoStart && timer.duration) {
      timerCtx.onSetDate(Date.now() + timer.duration);
      timerCtx.onSetAutoStart(timer.autoStart);
      timerCtx.onSetIsPaused(true);
      timerCtx.onSetIsStarted(false);
    } else {
      localStorage.removeItem("timer");
      timerCtx.onSetDate(Date.now() + minToMilliConverter(todoItems[0]?.goal));
      timerCtx.onSetAutoStart(false);
      timerCtx.onSetIsPaused(false);
      timerCtx.onSetIsStarted(false);
    }
  }, [todoItems]);

  const minToMilliConverter = (min: number) => {
    return min * 60 * 1000;
  };

  const handleStartClick = (): void => {
    timerCtx.onSetIsCompleted(false);
    timerCtx.countdownApi && timerCtx.countdownApi.start();
  };

  const handlePauseClick = (): void => {
    timerCtx.countdownApi && timerCtx.countdownApi.pause();
  };

  const handleResetClick = (): void => {
    localStorage.removeItem("timer");
    timerCtx.onSetDate(Date.now() + minToMilliConverter(todoItems[0]?.goal));
    timerCtx.onSetAutoStart(false);
    timerCtx.onSetIsPaused(false);
    timerCtx.onSetIsStarted(false);
    timerCtx.onSetIsCompleted(false);
  };

  const setRef = (countdown: Countdown | null): void => {
    if (countdown) {
      timerCtx.onSetCountdown(countdown);
      timerCtx.onSetCountdownApi(countdown.getApi());
    }
  };

  const handleStart = (res: any) => {
    localStorage.removeItem("timer");
    let itemToSet: TimerStorageInterface = {
      modelID: todoItems[0].modelID as string,
      endTime: Date.now() + res.total,
      autoStart: true,
    };

    localStorage.setItem("timer", JSON.stringify(itemToSet));
    timerCtx.onSetIsPaused(false);
    timerCtx.onSetIsStarted(true);
  };

  const handlePause = (res: CountdownTimeDelta): void => {
    localStorage.removeItem("timer");
    let itemToSet: TimerStorageInterface = {
      modelID: todoItems[0].modelID as string,
      autoStart: false,
      duration: res.total,
    };
    localStorage.setItem("timer", JSON.stringify(itemToSet));
    timerCtx.onSetIsPaused(true);
    timerCtx.onSetIsStarted(false);
  };

  const handleComplete = (res: CountdownTimeDelta) => {
    localStorage.removeItem("timer");
    timerCtx.onSetIsCompleted(true);
    dispatch(
      updateItemStart({
        ...todoItems[0],
        done: true,
        finished_at: Math.ceil(new Date().getTime() / 1000),
        progress: todoItems[0].goal,
      })
    );

    audio.play();
    document.title = `00:00`;
  };

  const handleTick = (res: CountdownTimeDelta) => {
    document.title = `${res.hours}:${res.minutes}:${res.seconds}`;
  };

  const handleFinishClick = () => {
    if (!timerCtx.countdown?.calcTimeDelta().total) {
      return;
    }
    localStorage.removeItem("timer");
    timerCtx.onSetIsCompleted(true);
    dispatch(
      updateItemStart({
        ...todoItems[0],
        done: true,
        finished_at: Math.ceil(new Date().getTime() / 1000),
        progress: Math.ceil(
          todoItems[0].goal - timerCtx.countdown?.calcTimeDelta().total / 60000
        ),
      })
    );

    audio.play();
    document.title = `00:00`;

    if (todoItems.length === 1) {
      timerCtx.onSetDate(null);
    }
    timerCtx.onSetAutoStart(false);
    timerCtx.onSetIsPaused(false);
    timerCtx.onSetIsStarted(false);
    timerCtx.onSetIsCompleted(false);
  };

  return (
    <div className="container-lg">
      <div className="w-100 py-4 d-flex justify-content-center bg-dark text-white">
        {timerCtx.date && (
          <div className={`${classes["timerContainer"]}`}>
            <Countdown
              key={timerCtx.date}
              ref={setRef}
              date={timerCtx.date}
              onStart={handleStart}
              onTick={handleTick}
              onPause={handlePause}
              onComplete={handleComplete}
              autoStart={timerCtx.autoStart}
              className="d-flex justify-content-center"
            />
            <div className="mt-4">
              <button
                type="button"
                className="btn btn-secondary btn-lg"
                onClick={handleStartClick}
                disabled={timerCtx.isStarted}
              >
                Start
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-lg mx-3"
                onClick={handlePauseClick}
                disabled={
                  timerCtx.isPaused ||
                  timerCtx.isCompleted ||
                  !timerCtx.isStarted
                }
              >
                Pause
              </button>
              <button
                className="btn btn-secondary btn-lg mx-3"
                disabled={
                  timerCtx.isCompleted ||
                  (!timerCtx.isStarted && !timerCtx.isPaused)
                }
                type="button"
                onClick={handleResetClick}
              >
                Reset
              </button>
              <button
                className="btn btn-secondary btn-lg"
                disabled={
                  timerCtx.isCompleted ||
                  (!timerCtx.isStarted && !timerCtx.isPaused)
                }
                type="button"
                onClick={handleFinishClick}
              >
                Finish
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timer;
