import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header.component";
import classes from "./layout.module.scss";

const Layout: React.FC = () => {
  return (
    <Fragment>
      <Header />
      <div className={`container ${classes.mainContainer}`}>
        <Outlet />
      </div>
    </Fragment>
  );
};

export default Layout;
