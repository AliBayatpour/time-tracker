import React from "react";
import Items from "../../components/home/items/items.component";
import Timer from "../../components/home/timer/timer.components";
import classes from "./home.module.scss";

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Timer />
      <Items />
    </React.Fragment>
  );
};

export default Home;
