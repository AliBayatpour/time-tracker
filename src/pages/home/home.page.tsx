import React, { useEffect, useState } from "react";
import Items from "../../components/home/items/items.component";
import RestTimer from "../../components/home/rest-timer/rest-timer";
import Timer from "../../components/home/timer/timer.components";
import { TimerStorage } from "../../interfaces/item-storage-interface";
import { convertMinToMilliSec } from "../../utils/date-utils";
import ringer from "../../assets/ringtones/win-10.mp3";
import { selectRestTime } from "../../store/rest-timer/rest-timer.selector";
import { useDispatch, useSelector } from "react-redux";
import AddItem from "../../components/home/add-item/add-item.component";
import { itemActions } from "../../store/item/item.slice";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const audio = new Audio(ringer);
  audio.loop = false;

  useEffect(() => {
    dispatch(itemActions.fetchItemsStart());
  }, []);

  const [restTimer, setRestTimer] = useState(false);

  const restTime = useSelector(selectRestTime);

  if (localStorage.getItem("rest") && !restTimer) {
    setRestTimer(true);
  }

  const onChangeShowRestTimer = (val: boolean) => {
    let restSet: TimerStorage;
    if (val) {
      restSet = {
        endTime: Date.now() + convertMinToMilliSec(restTime),
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
      <AddItem />
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
