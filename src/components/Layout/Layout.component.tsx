import { Box } from "@mui/material";
import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header.component";
import classes from "./layout.module.scss";

const Layout: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: "primary.main" }}>
      <Header />
      <div className={`container ${classes.mainContainer}`}>
        <Outlet />
      </div>
    </Box>
  );
};

export default Layout;
