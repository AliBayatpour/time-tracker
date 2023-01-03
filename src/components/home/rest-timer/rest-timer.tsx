import { useEffect, useState } from "react";
import Countdown, { CountdownTimeDelta } from "react-countdown";
import classes from "./rest.module.scss";
import { convertMinToMilliSec } from "../../../utils/date-utils";
import { TimerStorage } from "../../../interfaces/item-storage-interface";
import { useSelector } from "react-redux";
import { selectRestTime } from "../../../store/rest-timer/rest-timer.selector";
import { Button } from "@mui/material";

type Props = {
  onChangeShowRestTimer: (val: boolean) => void;
  onPlayAudio: () => void;
};
const RestTimer: React.FC<Props> = ({ onChangeShowRestTimer, onPlayAudio }) => {
  const [date, setDate] = useState<number | null>(null);
  const [countdown, setCountdown] = useState<Countdown | null>(null);

  const restTime = useSelector(selectRestTime);

  useEffect(() => {
    localStorage.removeItem("timer");
    let timerString = localStorage.getItem("rest");
    let timer: TimerStorage = timerString && JSON.parse(timerString);
    if (
      timer &&
      timer.autoStart &&
      timer.endTime &&
      timer.endTime - new Date().getTime() > 0
    ) {
      setDate(timer.endTime);
    } else {
      localStorage.removeItem("timer");
      setDate(Date.now() + convertMinToMilliSec(restTime));
    }
  }, []);

  const setRef = (countdown: Countdown | null): void => {
    if (countdown) {
      setCountdown(countdown);
    }
  };

  const handleComplete = (res: CountdownTimeDelta) => {
    onPlayAudio();
    document.title = `00:00`;
    onChangeShowRestTimer(false);
  };

  const handleTick = (res: CountdownTimeDelta) => {
    document.title = `${res.hours}:${res.minutes}:${res.seconds}`;
  };

  const handleFinishClick = () => {
    if (!countdown?.calcTimeDelta().total) {
      return;
    }
    onPlayAudio();
    document.title = `00:00`;
    onChangeShowRestTimer(false);
  };

  return (
    <div className="container">
      <h4 className="w-100 text-center">Rest</h4>
      <div className="w-100 py-4 d-flex justify-content-center">
        {date && (
          <div className={`${classes["timerContainer"]}`}>
            <Countdown
              key={date}
              ref={setRef}
              date={date}
              onTick={handleTick}
              onComplete={handleComplete}
              autoStart={true}
              className="d-flex justify-content-center"
            />
            <div className="mt-4 w-100 d-flex justify-content-center">
              <Button
                variant="contained"
                color="secondary"
                type="button"
                onClick={handleFinishClick}
              >
                Skip
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestTimer;
