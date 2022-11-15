import React, { useContext, useState } from "react";
import Items from "../../components/home/items/items.component";
import RestTimer from "../../components/home/rest-timer/rest-timer";
import Timer from "../../components/home/timer/timer.components";
import RestTimerContext from "../../context/rest-timer-context";
import { TimerStorageInterface } from "../../interfaces/item-storage-interface";
import { convertMinToMilliSec } from "../../utils/date-utils";
import ringer from "../../assets/ringtones/win-10.mp3";

const Home: React.FC = () => {
  const audio = new Audio(ringer);
  audio.loop = false;
  const timerCtx = useContext(RestTimerContext);
  const [restTimer, setRestTimer] = useState(false);

  if (localStorage.getItem("rest") && !restTimer) {
    setRestTimer(true);
  }

  const onChangeShowRestTimer = (val: boolean) => {
    let restSet: TimerStorageInterface;
    if (val) {
      restSet = {
        endTime: Date.now() + convertMinToMilliSec(timerCtx.restTime),
        autoStart: true,
      };
      localStorage.setItem("rest", JSON.stringify(restSet));
    } else {
      localStorage.removeItem("rest");
    }
    setRestTimer(val);
  };

  const onPlayAudio = () => {
    audio.play();
  };
  return (
    <React.Fragment>
      {!restTimer && (
        <Timer
          onChangeShowRestTimer={onChangeShowRestTimer}
          onPlayAudio={onPlayAudio}
        />
      )}
      {restTimer && (
        <RestTimer
          onChangeShowRestTimer={onChangeShowRestTimer}
          onPlayAudio={onPlayAudio}
        />
      )}
      <Items />
    </React.Fragment>
  );
};

export default Home;
