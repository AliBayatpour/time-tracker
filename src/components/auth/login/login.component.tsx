import React, { useRef } from "react";
import classes from "./login.module.scss";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/auth/auth.slice";
const Login: React.FC = () => {
  const dispatch = useDispatch();

  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;
    dispatch(authActions.loginStart({ email, password }));
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
