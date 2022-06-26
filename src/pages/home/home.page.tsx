import React, { useState } from "react";
import Items from "../../components/home/items/items.component";
import RestTimer from "../../components/home/rest-timer/rest-timer";
import Timer from "../../components/home/timer/timer.components";
import MessageModal from "../../components/shared/message-modal/message-modal.component";
import classes from "./home.module.scss";

const Home: React.FC = () => {
  const [restTimer, setRestTimer] = useState(false);

  const onChangeShowRestTimer = (val: boolean) => {
    setRestTimer(val);
  };
  return (
    <React.Fragment>
      {!restTimer && <Timer onChangeShowRestTimer={onChangeShowRestTimer} />}
      {restTimer && <RestTimer onChangeShowRestTimer={onChangeShowRestTimer} />}
      <Items />
      <MessageModal />
    </React.Fragment>
  );
};

export default Home;
