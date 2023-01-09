import React, { useState } from "react";
import classes from "./login.module.scss";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/auth/auth.slice";
import { isEmail, isPassword } from "../../../utils/inputValidators.utils";
import { Button, TextField } from "@mui/material";

type Props = {
  switchAuthModeHandler: () => void;
};

type LoginForm = {
  email: { value: string; isValid: boolean };
  password: { value: string; isValid: boolean };
};

const loginInitialState = {
  email: { value: "", isValid: false },
  password: { value: "", isValid: false },
};

const Login: React.FC<Props> = ({ switchAuthModeHandler }) => {
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState<LoginForm>(loginInitialState);

  let formIsValid = false;
  if (loginForm.password.isValid && loginForm.email.isValid) {
    formIsValid = true;
  }

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!loginForm.email.isValid || !loginForm.password.isValid) {
      return;
    }
    dispatch(
      authActions.loginStart({
        email: loginForm.email.value,
        password: loginForm.password.value,
      })
    );
  };

  const validateInput = (inputKey: keyof LoginForm, value: string): boolean => {
    switch (inputKey) {
      case "email":
        return isEmail(value);
      case "password":
        return isPassword(value);
      default:
        return false;
    }
  };

  const changeFormHandler = (key: keyof LoginForm, value: string) => {
    setLoginForm((prev) => {
      return {
        ...prev,
        [key]: { value: value, isValid: validateInput(key, value) },
      };
    });
  };

  return (
    <>
      <h1 className="mb-4">Login</h1>
      <form className="row" onSubmit={login}>
        <div className="col-12 my-3">
          <TextField
            className="w-100"
            type="text"
            id="email"
            label="Email"
            variant="outlined"
            value={loginForm.email.value}
            onChange={(event) =>
              changeFormHandler("email", event?.target.value)
            }
            error={!loginForm.email.isValid}
          />
        </div>
        <div className="col-12 my-3">
          <TextField
            className="w-100"
            type="password"
            id="password"
            label="Password"
            value={loginForm.password.value}
            onChange={(event) =>
              changeFormHandler("password", event?.target.value)
            }
            error={!loginForm.password.isValid}
          />
        </div>
        <div className="col-12">
          <div className="d-flex my-3">
            <Button type="submit" variant="contained" disabled={!formIsValid}>
              Submit
            </Button>
            <Button
              variant="outlined"
              onClick={switchAuthModeHandler}
              className="ms-3"
            >
              Switch to sign up
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
