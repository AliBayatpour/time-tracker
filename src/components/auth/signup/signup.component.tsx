import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/auth/auth.slice";
import classes from "./signup.module.scss";

const Signup: React.FC = () => {
  const dispatch = useDispatch();

  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  const signup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameInputRef.current?.value;
    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;

    dispatch(authActions.signupStart({ name, email, password }));
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
