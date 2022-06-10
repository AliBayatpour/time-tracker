import React from "react";
import Timer from "../../components/home/timer/timer.components";
import classes from "./home.module.scss";

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Timer />
    </React.Fragment>
  );
};

export default Home;
