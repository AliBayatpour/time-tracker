import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { authResInterface } from "../../../interfaces/auth-res-interface";
import AuthContext from "../../../context/auth-context";
import classes from "./signup.module.scss";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  const authCtx = useContext(AuthContext);

  const signup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const enteredName = nameInputRef.current?.value;
    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACK_END_URL}/auth/signup`,
        {
          method: "POST",
          body: JSON.stringify({
            name: enteredName,
            email: enteredEmail,
            password: enteredPassword,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = (await response.json()) as authResInterface;
      if (json) {
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
      <h1>Signup</h1>
      <form onSubmit={signup}>
        <div className="form-group">
          <label htmlFor="signupName">Name</label>
          <input
            type="text"
            ref={nameInputRef}
            className="form-control"
            id="signupName"
            placeholder="Your name"
            required
          />
        </div>
        <div className="form-group my-4">
          <label htmlFor="signupEmail">Email address</label>
          <input
            type="email"
            ref={emailInputRef}
            className="form-control"
            id="signupEmail"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="signupPass">Password</label>
          <input
            type="password"
            minLength={6}
            ref={passwordInputRef}
            className="form-control"
            id="signupPass"
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

export default Signup;
