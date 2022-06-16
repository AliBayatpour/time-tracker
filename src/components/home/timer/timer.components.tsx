import { useContext, useEffect } from "react";
import Countdown, { CountdownTimeDelta } from "react-countdown";
import { TimerStorageInterface } from "../../../interfaces/item-storage-interface";
import ItemContext from "../../../store/item-context";
import TimerContext from "../../../store/timer-context";
import classes from "./timer.module.scss";
const Timer: React.FC = () => {
  const itemCtx = useContext(ItemContext);
  const timerCtx = useContext(TimerContext);

  useEffect(() => {
    let timerString = localStorage.getItem("timer");
    let timer: TimerStorageInterface = timerString && JSON.parse(timerString);
    if (!itemCtx.todoItems[0]) {
      return;
    }
    if (
      itemCtx.todoItems &&
      timer?.modelID &&
      timer?.modelID !== itemCtx.todoItems[0].modelID
    ) {
      localStorage.removeItem("timer");
    }
    if (timer && timer.autoStart && timer.endTime && timer.endTime > 0) {
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
      timerCtx.onSetDate(
        Date.now() + minToMilliConverter(itemCtx.todoItems[0]?.goal)
      );
      timerCtx.onSetAutoStart(false);
      timerCtx.onSetIsPaused(false);
      timerCtx.onSetIsStarted(false);
    }
  }, [itemCtx.todoItems]);

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
    timerCtx.onSetDate(
      Date.now() + minToMilliConverter(itemCtx.todoItems[0]?.goal)
    );
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
      modelID: itemCtx.todoItems[0].modelID as string,
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
      modelID: itemCtx.todoItems[0].modelID as string,
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
    itemCtx.updateItemAsync({
      ...itemCtx.todoItems[0],
      done: true,
      finished_at: Math.ceil(new Date().getTime() / 1000),
      progress: itemCtx.todoItems[0].goal,
    });
  };

  const handleFinishClick = () => {
    if (!timerCtx.countdown?.calcTimeDelta().total) {
      return;
    }
    localStorage.removeItem("timer");
    timerCtx.onSetIsCompleted(true);
    if (
      Math.round(
        itemCtx.todoItems[0].goal -
          timerCtx.countdown?.calcTimeDelta().total / 60000
      ) !== 0
    ) {
      itemCtx.updateItemAsync({
        ...itemCtx.todoItems[0],
        done: true,
        finished_at: Math.ceil(new Date().getTime() / 1000),
        progress: Math.round(
          itemCtx.todoItems[0].goal -
            timerCtx.countdown?.calcTimeDelta().total / 60000
        ),
      });
    }

    if (itemCtx.todoItems.length === 1) {
      timerCtx.onSetDate(null);
    }
    timerCtx.onSetAutoStart(false);
    timerCtx.onSetIsPaused(false);
    timerCtx.onSetIsStarted(false);
    timerCtx.onSetIsCompleted(false);
  };

  return (
    <div className="container-lg">
      <div className="w-100 d-flex justify-content-center">
        {timerCtx.date && (
          <div className={`${classes["timerContainer"]}`}>
            <Countdown
              key={timerCtx.date}
              ref={setRef}
              date={timerCtx.date}
              onStart={handleStart}
              onPause={handlePause}
              onComplete={handleComplete}
              autoStart={timerCtx.autoStart}
              className="d-flex justify-content-center"
            />
            <div className="mt-5">
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
