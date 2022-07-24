import React, { useContext, useRef } from "react";
import { authResInterface } from "../../../interfaces/auth-res-interface";
import AuthContext from "../../../context/auth-context";
import classes from "./login.module.scss";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  const authCtx = useContext(AuthContext);

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;
    try {
      const response = await fetch(`${process.env.REACT_APP_BACK_END_URL}/auth/login/`, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = (await response.json()) as authResInterface;
      if (json.access_token) {
        authCtx.login(json);
        navigate("/", { replace: true });
      } else {
        authCtx.logout();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={`${classes.mainContainer} text-light`}>
      <h1>Login</h1>
      <form onSubmit={login}>
        <div className="form-group mb-4">
          <label htmlFor="loginEmail">Email address</label>
          <input
            type="email"
            ref={emailInputRef}
            className="form-control"
            id="loginEmail"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="loginPassword">Password</label>
          <input
            type="password"
            minLength={6}
            ref={passwordInputRef}
            className="form-control"
            id="loginPassword"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary my-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
