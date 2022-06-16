import React, { ReactElement, useState } from "react";
import Countdown, { CountdownApi } from "react-countdown";

interface TimerContextInterface {
  date: number | null;
  autoStart: boolean;
  countdownApi: CountdownApi | null;
  countdown: Countdown | null;
  isPaused: boolean;
  isStarted: boolean;
  isCompleted: boolean;
  onSetAutoStart: (val: boolean) => void;
  onSetCountdownApi: (val: CountdownApi) => void;
  onSetCountdown: (val: Countdown) => void;
  onSetIsPaused: (val: boolean) => void;
  onSetIsStarted: (val: boolean) => void;
  onSetIsCompleted: (val: boolean) => void;
  onSetDate: (val: number | null) => void;
}

const TimerContext = React.createContext<TimerContextInterface>({
  date: null,
  autoStart: false,
  countdownApi: null,
  countdown: null,
  isPaused: false,
  isStarted: false,
  isCompleted: false,
  onSetAutoStart: (val: boolean) => {},
  onSetCountdownApi: (val: CountdownApi) => {},
  onSetCountdown: (val: Countdown) => {},
  onSetIsPaused: (val: boolean) => {},
  onSetIsStarted: (val: boolean) => {},
  onSetIsCompleted: (val: boolean) => {},
  onSetDate: (val: number | null) => {},
});
type Props = {
  children: JSX.Element;
};
export const TimerContextProvider = (props: Props): ReactElement<any, any> => {
  const [date, setDate] = useState<number | null>(null);
  const [autoStart, setAutoStart] = useState<boolean>(false);
  const [countdownApi, setCountdownApi] = useState<CountdownApi | null>(null);
  const [countdown, setcountdown] = useState<Countdown | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const onSetAutoStart = (val: boolean) => {
    setAutoStart(val);
  };
  const onSetCountdownApi = (val: CountdownApi) => {
    setCountdownApi(val);
  };
  const onSetCountdown = (val: Countdown) => {
    setcountdown(val);
  };
  const onSetIsPaused = (val: boolean) => {
    setIsPaused(val);
  };
  const onSetIsStarted = (val: boolean) => {
    setIsStarted(val);
  };
  const onSetIsCompleted = (val: boolean) => {
    setIsCompleted(val);
  };
  const onSetDate = (val: number | null) => {
    setDate(val);
  };

  const contextValue = {
    date: date,
    autoStart: autoStart,
    countdownApi: countdownApi,
    countdown: countdown,
    isPaused: isPaused,
    isStarted: isStarted,
    isCompleted: isCompleted,
    onSetAutoStart: onSetAutoStart,
    onSetCountdownApi: onSetCountdownApi,
    onSetCountdown: onSetCountdown,
    onSetIsPaused: onSetIsPaused,
    onSetIsStarted: onSetIsStarted,
    onSetIsCompleted: onSetIsCompleted,
    onSetDate: onSetDate,
  };

  return (
    <TimerContext.Provider value={contextValue}>
      {props.children}
    </TimerContext.Provider>
  );
};

export default TimerContext;
