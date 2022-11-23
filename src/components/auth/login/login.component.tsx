import React from "react";
import classes from "./login.module.scss";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/auth/auth.slice";
import useInput from "../../../hooks/use-input";
import Input from "../../shared/input/input";
import { isEmail, isPassword } from "../../../utils/input-validators-utils";
import Button from "../../shared/button/Button.component";
const Login: React.FC = () => {
  const dispatch = useDispatch();

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
  if (enteredPasswordIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!enteredEmailIsValid || !enteredPasswordIsValid) {
      return;
    }
    dispatch(
      authActions.loginStart({ email: enteredEmail, password: enteredpassword })
    );
  };
  return (
    <div className={`${classes.mainContainer} `}>
      <h1>Login</h1>
      <form onSubmit={login}>
        <Input
          type="text"
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
        <Button
          type="submit"
          className="btn btn-primary my-3"
          disabled={!formIsValid}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Login;
