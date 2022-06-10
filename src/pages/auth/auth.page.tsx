import React, { useState } from "react";
import Login from "../../components/auth/login/login.component";
import Signup from "../../components/auth/signup/signup.component";
import classes from "./auth.module.scss";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div className={`container-lg ${classes.mainContainer}`}>
      {isLogin ? <Login /> : <Signup />}
      <button
        className="btn btn-secondary btn-block"
        onClick={switchAuthModeHandler}
      >
        Switch to {isLogin ? "signup" : "login"}
      </button>
    </div>
  );
};

export default Auth;
