import React from "react";
import { useDispatch } from "react-redux";
import useInput from "../../../hooks/use-input";
import { authActions } from "../../../store/auth/auth.slice";
import {
  isEmail,
  isNotEmpty,
  isPassword,
} from "../../../utils/input-validators-utils";
import Input from "../../shared/input/input";
import classes from "./signup.module.scss";

const Signup: React.FC = () => {
  const dispatch = useDispatch();

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput(isNotEmpty);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(isEmail);

  const {
    value: enteredpassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(isPassword);

  let formIsValid = false;
  if (enteredNameIsValid && enteredPasswordIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const signup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !enteredNameIsValid ||
      !enteredEmailIsValid ||
      !enteredPasswordIsValid
    ) {
      return;
    }
    dispatch(
      authActions.signupStart({
        name: enteredName,
        email: enteredEmail,
        password: enteredpassword,
      })
    );
  };
  return (
    <div className={`${classes.mainContainer} `}>
      <h1>Signup</h1>
      <form onSubmit={signup}>
        <Input
          type="text"
          id="name"
          label="Name"
          value={enteredName}
          onBlur={nameBlurHandler}
          onChange={nameChangeHandler}
          hasError={nameHasError}
        />
        <Input
          type="email"
          id="email"
          label="Email"
          value={enteredEmail}
          onBlur={emailBlurHandler}
          onChange={emailChangeHandler}
          hasError={emailHasError}
        />
        <Input
          type="password"
          id="password"
          label="Password"
          value={enteredpassword}
          onBlur={passwordBlurHandler}
          onChange={passwordChangeHandler}
          hasError={passwordHasError}
        />
        <button type="submit" disabled={!formIsValid}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
