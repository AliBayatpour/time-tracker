import React, { useState } from "react";
import Login from "../../components/auth/login/Login.component";
import SignUp from "../../components/auth/signup/Signup.component";
import classes from "./auth.module.scss";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <div className={`container ${classes.mainContainer} pt-6`}>
      {isLogin ? (
        <Login switchAuthModeHandler={() => setIsLogin(false)} />
      ) : (
        <SignUp switchAuthModeHandler={() => setIsLogin(true)} />
      )}
    </div>
  );
};

export default Auth;
