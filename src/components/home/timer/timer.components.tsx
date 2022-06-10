import { useEffect, useState } from "react";
import Countdown, { CountdownApi, CountdownTimeDelta } from "react-countdown";
import { itemStorageInterface } from "../../../interfaces/item-storage-interface";
import classes from "./timer.module.scss";
const Timer: React.FC = () => {
  const [date, setDate] = useState<number | null>(null);
  const [goal, setGoal] = useState<number>(10000);
  const [autoStart, setAutoStart] = useState<boolean>(false);
  const [countdownApi, setCountdownApi] = useState<CountdownApi>();
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  useEffect(() => {
    let itemString = localStorage.getItem("item");
    let item: itemStorageInterface = itemString && JSON.parse(itemString);
    if (item && item.autoStart && item.endTime && item.endTime > 0) {
      setDate(item.endTime);
      console.log(!item.autoStart);
      setAutoStart(item.autoStart);
      setIsPaused(!item.autoStart);
      setIsStarted(item.autoStart);
    } else if (item && !item.autoStart && item.duration) {
      setDate(Date.now() + item.duration);
      setAutoStart(item.autoStart);
      setIsPaused(!item.autoStart);
      setIsStarted(item.autoStart);
    } else {
      localStorage.removeItem("item");
      setDate(Date.now() + goal);
      setAutoStart(false);
      setIsPaused(true);
      setIsStarted(false);
    }
  }, [goal]);

  const handleStartClick = (): void => {
    setCountdownApi(countdownApi);
    countdownApi && countdownApi.start();
  };

  const handlePauseClick = (): void => {
    countdownApi && countdownApi.pause();
  };

  const handleResetClick = (): void => {
    console.log("reset called");
    localStorage.removeItem("item");
    setDate(Date.now() + goal);
    setAutoStart(false);
    setIsPaused(true);
    setIsStarted(false);
    setIsCompleted(false);
  };

  const setRef = (countdown: Countdown | null): void => {
    if (countdown) {
      setCountdownApi(countdown.getApi());
    }
  };

  const handleStart = (res: any) => {
    localStorage.removeItem("item");
    localStorage.setItem(
      "item",
      JSON.stringify({
        endTime: Date.now() + res.total,
        autoStart: true,
      } as itemStorageInterface)
    );
    setIsPaused(false);
    setIsStarted(true);
  };

  const handlePause = (res: CountdownTimeDelta): void => {
    localStorage.removeItem("item");
    localStorage.setItem(
      "item",
      JSON.stringify({
        autoStart: false,
        duration: res.total,
      } as itemStorageInterface)
    );
    setIsPaused(true);
    setIsStarted(false);
  };

  const handleComplete = (res: any) => {
    localStorage.removeItem("item");
    setIsCompleted(true);
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
                disabled={isStarted || isCompleted}
              >
                Start
              </button>
              <button
                type="button"
                onClick={handlePauseClick}
                disabled={isPaused || isCompleted}
              >
                Pause
              </button>
              <button type="button" onClick={handleResetClick}>
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timer;
