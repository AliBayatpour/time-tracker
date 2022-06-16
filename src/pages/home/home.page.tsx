import React from "react";
import Items from "../../components/home/items/items.component";
import Timer from "../../components/home/timer/timer.components";
import MessageModal from "../../components/shared/message-modal/message-modal.component";
import classes from "./home.module.scss";

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Timer />
      <Items />
      <MessageModal />
    </React.Fragment>
  );
};

export default Home;
