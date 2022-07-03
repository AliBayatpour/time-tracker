import React, { ReactElement, useState } from "react";
import Countdown, { CountdownApi } from "react-countdown";

interface RestTimerContextInterface {
  date: number | null;
  countdownApi: CountdownApi | null;
  countdown: Countdown | null;
  isCompleted: boolean;
  restTime: number;
  onSetCountdownApi: (val: CountdownApi) => void;
  onSetCountdown: (val: Countdown) => void;
  onSetIsCompleted: (val: boolean) => void;
  onSetDate: (val: number | null) => void;
  onSetRestTime: (val: number) => void;
}
const defaultRest = 5;
const RestTimerContext = React.createContext<RestTimerContextInterface>({
  date: null,
  countdownApi: null,
  countdown: null,
  isCompleted: false,
  restTime: defaultRest,
  onSetCountdownApi: (val: CountdownApi) => {},
  onSetCountdown: (val: Countdown) => {},
  onSetIsCompleted: (val: boolean) => {},
  onSetDate: (val: number | null) => {},
  onSetRestTime: (val: number) => {},
});
type Props = {
  children: JSX.Element;
};
export const RestTimerContextProvider = (
  props: Props
): ReactElement<any, any> => {
  const [date, setDate] = useState<number | null>(null);
  const [countdownApi, setCountdownApi] = useState<CountdownApi | null>(null);
  const [countdown, setcountdown] = useState<Countdown | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [restTime, setRestTime] = useState<number>(
    localStorage.getItem("restTime")
      ? Number(localStorage.getItem("restTime"))
      : defaultRest
  );
  const onSetCountdownApi = (val: CountdownApi) => {
    setCountdownApi(val);
  };
  const onSetCountdown = (val: Countdown) => {
    setcountdown(val);
  };
  const onSetIsCompleted = (val: boolean) => {
    setIsCompleted(val);
  };
  const onSetDate = (val: number | null) => {
    setDate(val);
  };

  const onSetRestTime = (val: number) => {
    setRestTime(val);
  };

  const contextValue = {
    date: date,
    countdownApi: countdownApi,
    countdown: countdown,
    isCompleted: isCompleted,
    restTime: restTime,
    onSetCountdownApi: onSetCountdownApi,
    onSetCountdown: onSetCountdown,
    onSetIsCompleted: onSetIsCompleted,
    onSetDate: onSetDate,
    onSetRestTime: onSetRestTime,
  };

  return (
    <RestTimerContext.Provider value={contextValue}>
      {props.children}
    </RestTimerContext.Provider>
  );
};

export default RestTimerContext;
