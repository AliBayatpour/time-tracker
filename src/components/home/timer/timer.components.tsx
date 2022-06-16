import { useContext, useEffect, useState } from "react";
import Countdown, { CountdownApi, CountdownTimeDelta } from "react-countdown";
import { TimerStorageInterface } from "../../../interfaces/item-storage-interface";
import ItemContext from "../../../store/item-context";
import classes from "./timer.module.scss";
const Timer: React.FC = () => {
  const itemCtx = useContext(ItemContext);

  const [date, setDate] = useState<number | null>(null);

  const [autoStart, setAutoStart] = useState<boolean>(false);
  const [countdownApi, setCountdownApi] = useState<CountdownApi>();
  const [countdown, setcountdown] = useState<Countdown>();
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
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
      setDate(timer.endTime);
      setAutoStart(timer.autoStart);
      setIsPaused(!timer.autoStart);
      setIsStarted(timer.autoStart);
    } else if (timer && !timer.autoStart && timer.duration) {
      setDate(Date.now() + timer.duration);
      setAutoStart(timer.autoStart);
      setIsPaused(!timer.autoStart);
      setIsStarted(timer.autoStart);
    } else {
      localStorage.removeItem("timer");
      setDate(Date.now() + minToMilliConverter(itemCtx.todoItems[0]?.goal));
      setAutoStart(false);
      setIsPaused(false);
      setIsStarted(false);
    }
  }, [itemCtx.todoItems]);

  const minToMilliConverter = (min: number) => {
    return min * 60 * 1000;
  };

  const handleStartClick = (): void => {
    setCountdownApi(countdownApi);
    setIsCompleted(false);
    countdownApi && countdownApi.start();
  };

  const handlePauseClick = (): void => {
    countdownApi && countdownApi.pause();
  };

  const handleResetClick = (): void => {
    localStorage.removeItem("timer");
    setDate(Date.now() + minToMilliConverter(itemCtx.todoItems[0]?.goal));
    setAutoStart(false);
    setIsPaused(true);
    setIsStarted(false);
    setIsCompleted(false);
  };

  const setRef = (countdown: Countdown | null): void => {
    if (countdown) {
      setcountdown(countdown);
      setCountdownApi(countdown.getApi());
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
    setIsPaused(false);
    setIsStarted(true);
  };

  const handlePause = (res: CountdownTimeDelta): void => {
    localStorage.removeItem("timer");
    let itemToSet: TimerStorageInterface = {
      modelID: itemCtx.todoItems[0].modelID as string,
      autoStart: false,
      duration: res.total,
    };
    localStorage.setItem("timer", JSON.stringify(itemToSet));
    setIsPaused(true);
    setIsStarted(false);
  };

  const handleComplete = (res: CountdownTimeDelta) => {
    localStorage.removeItem("timer");
    setIsCompleted(true);
    itemCtx.updateItemAsync({
      ...itemCtx.todoItems[0],
      done: true,
      finished_at: Math.ceil(new Date().getTime() / 1000),
      progress: itemCtx.todoItems[0].goal,
    });
  };

  const handleFinishClick = () => {
    if (!countdown?.calcTimeDelta().total) {
      return;
    }
    localStorage.removeItem("timer");
    setIsCompleted(true);
    if (
      Math.round(
        itemCtx.todoItems[0].goal - countdown?.calcTimeDelta().total / 60000
      ) !== 0
    ) {
      itemCtx.updateItemAsync({
        ...itemCtx.todoItems[0],
        done: true,
        finished_at: Math.ceil(new Date().getTime() / 1000),
        progress: Math.round(
          itemCtx.todoItems[0].goal - countdown?.calcTimeDelta().total / 60000
        ),
      });
    }

    if (itemCtx.todoItems.length === 1) {
      setDate(null);
    }
    setAutoStart(false);
    setIsPaused(true);
    setIsStarted(false);
    setIsCompleted(false);
  };

  return (
    <div className="container-lg">
      <div className="w-100 d-flex justify-content-center">
        {date && (
          <div className={`${classes["timerContainer"]}`}>
            <Countdown
              key={date}
              ref={setRef}
              date={date}
              onStart={handleStart}
              onPause={handlePause}
              onComplete={handleComplete}
              autoStart={autoStart}
              className="d-flex justify-content-center"
            />
            <div className="mt-5">
              <button
                type="button"
                onClick={handleStartClick}
                disabled={isStarted}
              >
                Start
              </button>
              <button
                type="button"
                onClick={handlePauseClick}
                disabled={isPaused || isCompleted || !isStarted}
              >
                Pause
              </button>
              <button
                disabled={isCompleted || (!isStarted && !isPaused)}
                type="button"
                onClick={handleResetClick}
              >
                Reset
              </button>
              <button
                disabled={isCompleted || !isStarted}
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
