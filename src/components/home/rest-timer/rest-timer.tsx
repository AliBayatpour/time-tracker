import { useContext, useEffect } from "react";
import Countdown, { CountdownTimeDelta } from "react-countdown";
import classes from "./rest.module.scss";
import RestTimerContext from "../../../context/rest-timer-context";
import { convertMinToMilliSec } from "../../../utils/date-utils";
import { TimerStorageInterface } from "../../../interfaces/item-storage-interface";

type Props = {
  onChangeShowRestTimer: (val: boolean) => void;
  onPlayAudio: () => void;
};
const RestTimer: React.FC<Props> = ({ onChangeShowRestTimer, onPlayAudio }) => {
  const timerCtx = useContext(RestTimerContext);

  useEffect(() => {
    localStorage.removeItem("timer");
    let timerString = localStorage.getItem("rest");
    let timer: TimerStorageInterface = timerString && JSON.parse(timerString);
    if (
      timer &&
      timer.autoStart &&
      timer.endTime &&
      timer.endTime - new Date().getTime() > 0
    ) {
      console.log(timerCtx.restTime);
      timerCtx.onSetDate(timer.endTime);
    } else {
      localStorage.removeItem("timer");
      timerCtx.onSetDate(Date.now() + convertMinToMilliSec(timerCtx.restTime));
    }
  }, []);

  const setRef = (countdown: Countdown | null): void => {
    if (countdown) {
      timerCtx.onSetCountdown(countdown);
      timerCtx.onSetCountdownApi(countdown.getApi());
    }
  };

  const handleComplete = (res: CountdownTimeDelta) => {
    timerCtx.onSetIsCompleted(true);
    onPlayAudio();
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
    onPlayAudio();
    document.title = `00:00`;
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
              onTick={handleTick}
              onComplete={handleComplete}
              autoStart={true}
              className="d-flex justify-content-center"
            />
            <div className="mt-4 w-100 d-flex justify-content-center">
              <button
                className="btn btn-secondary btn-lg"
                type="button"
                onClick={handleFinishClick}
              >
                Skip
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestTimer;
