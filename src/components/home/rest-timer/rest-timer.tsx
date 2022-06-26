import { useContext, useEffect } from "react";
import Countdown, { CountdownTimeDelta } from "react-countdown";
import classes from "./rest.module.scss";
import ringer from "../../../assets/ringtones/win-10.mp3";
import RestTimerContext from "../../../context/rest-timer-context";

type Props = {
  onChangeShowRestTimer: (val: boolean) => void;
};
const RestTimer: React.FC<Props> = ({ onChangeShowRestTimer }) => {
  const timerCtx = useContext(RestTimerContext);
  const audio = new Audio(ringer);
  audio.loop = false;

  useEffect(() => {
    localStorage.removeItem("timer");
    timerCtx.onSetDate(Date.now() + minToMilliConverter(5));
    timerCtx.onSetAutoStart(true);
    timerCtx.onSetIsPaused(false);
    timerCtx.onSetIsStarted(false);
  }, []);

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
    timerCtx.onSetDate(Date.now() + minToMilliConverter(5));
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
    timerCtx.onSetIsPaused(false);
    timerCtx.onSetIsStarted(true);
  };

  const handlePause = (res: CountdownTimeDelta): void => {
    timerCtx.onSetIsPaused(true);
    timerCtx.onSetIsStarted(false);
  };

  const handleComplete = (res: CountdownTimeDelta) => {
    timerCtx.onSetIsCompleted(true);
    audio.play();
    document.title = `00:00`;
    onChangeShowRestTimer(false);
  };

  const handleTick = (res: CountdownTimeDelta) => {
    document.title = `${res.hours}:${res.minutes}:${res.seconds}`;
  };

  const handleFinishClick = () => {
    if (!timerCtx.countdown?.calcTimeDelta().total) {
      return;
    }
    audio.play();
    document.title = `00:00`;
    timerCtx.onSetAutoStart(false);
    timerCtx.onSetIsPaused(false);
    timerCtx.onSetIsStarted(false);
    timerCtx.onSetIsCompleted(false);
    onChangeShowRestTimer(false);
  };

  return (
    <div className="container-lg">
      <h4 className="w-100 text-center text-warning">Rest</h4>
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

export default RestTimer;
