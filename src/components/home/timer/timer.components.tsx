import { useEffect, useState } from "react";
import Countdown, { CountdownApi, CountdownTimeDelta } from "react-countdown";
import { TimerStorage } from "../../../interfaces/itemStorage.interface";
import classes from "./timer.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectTodoItems } from "../../../store/item/item.selector";
import { convertMinToMilliSec } from "../../../utils/date.utils";
import { itemActions } from "../../../store/item/item.slice";
import { timerActions } from "../../../store/timer/timer.slice";
import {
  selectAutoStart,
  selectIsCompleted,
  selectIsPaused,
  selectIsStarted,
} from "../../../store/timer/timer.selector";
import { Box, Button, Typography } from "@mui/material";

type Props = {
  onChangeShowRestTimer: (val: boolean) => void;
  onPlayAudio: () => void;
};
const Timer: React.FC<Props> = ({ onChangeShowRestTimer, onPlayAudio }) => {
  const [date, setDate] = useState<number | null>(null);
  const [countdownApi, setCountdownApi] = useState<CountdownApi | null>(null);
  const [countdown, setcountdown] = useState<Countdown | null>(null);

  const todoItems = useSelector(selectTodoItems);
  const autoStart = useSelector(selectAutoStart);
  const isStarted = useSelector(selectIsStarted);
  const isPaused = useSelector(selectIsPaused);
  const isCompleted = useSelector(selectIsCompleted);

  const dispatch = useDispatch();

  useEffect(() => {
    let timerString = localStorage.getItem("timer");
    let timer: TimerStorage = timerString && JSON.parse(timerString);
    if (!todoItems[0]) {
      onSetDate(null);
      return;
    }
    if (todoItems && timer?.id && timer?.id !== todoItems[0].id) {
      localStorage.removeItem("timer");
    }
    if (
      timer &&
      timer.autoStart &&
      timer.endTime &&
      timer.endTime - new Date().getTime() > 0
    ) {
      onSetDate(timer.endTime);
      dispatch(timerActions.setAutoStart(timer.autoStart));
      dispatch(timerActions.setIsPaused(false));
      dispatch(timerActions.setIsStarted(true));
    } else if (timer && !timer.autoStart && timer.duration) {
      onSetDate(Date.now() + timer.duration);
      dispatch(timerActions.setAutoStart(timer.autoStart));
      dispatch(timerActions.setIsPaused(true));
      dispatch(timerActions.setIsStarted(false));
    } else {
      localStorage.removeItem("timer");
      onSetDate(Date.now() + convertMinToMilliSec(todoItems[0]?.goal));
      dispatch(timerActions.setAutoStart(false));
      dispatch(timerActions.setIsPaused(false));
      dispatch(timerActions.setIsStarted(false));
    }
  }, [todoItems]);

  const onSetCountdownApi = (val: CountdownApi) => {
    setCountdownApi(val);
  };
  const onSetCountdown = (val: Countdown) => {
    setcountdown(val);
  };
  const onSetDate = (val: number | null) => {
    setDate(val);
  };

  const handleStartClick = (): void => {
    dispatch(timerActions.setIsCompleted(false));

    countdownApi && countdownApi.start();
  };

  const handlePauseClick = (): void => {
    countdownApi && countdownApi.pause();
  };

  const handleResetClick = (): void => {
    localStorage.removeItem("timer");
    onSetDate(Date.now() + convertMinToMilliSec(todoItems[0]?.goal));
    dispatch(timerActions.setAutoStart(false));
    dispatch(timerActions.setIsPaused(false));
    dispatch(timerActions.setIsStarted(false));
    dispatch(timerActions.setIsCompleted(false));
  };

  const setRef = (countdown: Countdown | null): void => {
    if (countdown) {
      onSetCountdown(countdown);
      onSetCountdownApi(countdown.getApi());
    }
  };

  const handleStart = (res: any) => {
    localStorage.removeItem("timer");
    let itemToSet: TimerStorage = {
      id: todoItems[0].id as string,
      endTime: Date.now() + res.total,
      autoStart: true,
    };

    localStorage.setItem("timer", JSON.stringify(itemToSet));
    dispatch(timerActions.setIsPaused(false));
    dispatch(timerActions.setIsStarted(true));
  };

  const handlePause = (res: CountdownTimeDelta): void => {
    localStorage.removeItem("timer");
    let itemToSet: TimerStorage = {
      id: todoItems[0].id as string,
      autoStart: false,
      duration: res.total,
    };
    localStorage.setItem("timer", JSON.stringify(itemToSet));
    dispatch(timerActions.setIsPaused(true));
    dispatch(timerActions.setIsStarted(false));
  };

  const handleComplete = (res: CountdownTimeDelta) => {
    localStorage.removeItem("timer");
    dispatch(timerActions.setIsCompleted(true));
    dispatch(
      itemActions.updateItemStart({
        ...todoItems[0],
        done: true,
        finishedAt: new Date().getTime(),
        progress: todoItems[0].goal,
      })
    );

    onPlayAudio();
    document.title = `00:00`;
    onChangeShowRestTimer(true);
  };

  const handleTick = (res: CountdownTimeDelta) => {
    document.title = `${res.hours}:${res.minutes}:${res.seconds}`;
  };

  const handleFinishClick = () => {
    if (!countdown?.calcTimeDelta().total) {
      return;
    }
    localStorage.removeItem("timer");
    dispatch(timerActions.setIsCompleted(true));
    dispatch(
      itemActions.updateItemStart({
        ...todoItems[0],
        done: true,
        finishedAt: new Date().getTime(),
        progress: Math.ceil(
          todoItems[0].goal - countdown?.calcTimeDelta().total / 60000
        ),
      })
    );

    onPlayAudio();
    document.title = `00:00`;

    if (todoItems.length === 1) {
      onSetDate(null);
    }
    dispatch(timerActions.setAutoStart(false));
    dispatch(timerActions.setIsPaused(false));
    dispatch(timerActions.setIsStarted(false));
    dispatch(timerActions.setIsCompleted(false));
    onChangeShowRestTimer(true);
  };

  return (
    <div className="container">
      <Typography
        sx={{ fontWeight: 700 }}
        className="w-100 text-center"
        variant="h5"
        color="secondary"
      >
        {todoItems[0]?.category}
      </Typography>

      <div className="w-100 pb-4 d-flex justify-content-center">
        {date && (
          <Box
            sx={{ color: "secondary.main" }}
            className={`${classes["timerContainer"]}`}
          >
            <Countdown
              key={date}
              ref={setRef}
              date={date}
              onStart={handleStart}
              onTick={handleTick}
              onPause={handlePause}
              onComplete={handleComplete}
              autoStart={autoStart}
              className="d-flex justify-content-center"
            />
            <div className="w-100 d-flex justify-content-center">
              <Button
                className="mx-2"
                variant="contained"
                color="secondary"
                type="button"
                onClick={handleStartClick}
                disabled={isStarted}
              >
                {isPaused ? "Resume" : "Start"}
              </Button>
              <Button
                className="mx-2"
                type="button"
                variant="contained"
                color="secondary"
                onClick={handlePauseClick}
                disabled={isPaused || isCompleted || !isStarted}
              >
                Pause
              </Button>
              <Button
                className="mx-2"
                variant="contained"
                color="secondary"
                disabled={isCompleted || (!isStarted && !isPaused)}
                type="button"
                onClick={handleResetClick}
              >
                Reset
              </Button>
              <Button
                className="mx-2"
                variant="contained"
                color="secondary"
                disabled={isCompleted || (!isStarted && !isPaused)}
                type="button"
                onClick={handleFinishClick}
              >
                Finish
              </Button>
            </div>
          </Box>
        )}
      </div>
    </div>
  );
};

export default Timer;
