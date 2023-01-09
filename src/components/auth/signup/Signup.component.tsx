import { Autocomplete, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TIMEZONE_LIST } from "../../../constants/timezones.constant";
import { authActions } from "../../../store/auth/auth.slice";
import {
  isEmail,
  isNotEmpty,
  isPassword,
} from "../../../utils/inputValidators.utils";
import { getTimezone } from "../../../utils/token-utils";

type Props = {
  switchAuthModeHandler: () => void;
};

type SignUpForm = {
  name: { value: string; isValid: boolean };
  email: { value: string; isValid: boolean };
  password: { value: string; isValid: boolean };
  timezone: { value: string; isValid: boolean };
};

const loginInitialState = {
  name: { value: "", isValid: false },
  email: { value: "", isValid: false },
  password: { value: "", isValid: false },
  timezone: { value: getTimezone(), isValid: true },
};

const SignUp: React.FC<Props> = ({ switchAuthModeHandler }) => {
  const dispatch = useDispatch();
  const [signUpForm, setSignUpForm] = useState<SignUpForm>(loginInitialState);

  let formIsValid = false;
  if (
    signUpForm.name.isValid &&
    signUpForm.password.isValid &&
    signUpForm.email.isValid &&
    signUpForm.timezone.isValid
  ) {
    formIsValid = true;
  }

  const signup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !signUpForm.name.isValid ||
      !signUpForm.email.isValid ||
      !signUpForm.password.isValid ||
      !signUpForm.timezone.isValid
    ) {
      return;
    }
    dispatch(
      authActions.signupStart({
        name: signUpForm.name.value,
        email: signUpForm.email.value,
        password: signUpForm.password.value,
        timezone: signUpForm.timezone.value,
      })
    );
  };

  const validateInput = (
    inputKey: keyof SignUpForm,
    value: string
  ): boolean => {
    switch (inputKey) {
      case "name":
        return isNotEmpty(value);
      case "timezone":
        return isNotEmpty(value);
      case "email":
        return isEmail(value);
      case "password":
        return isPassword(value);
      default:
        return false;
    }
  };

  const changeFormHandler = (key: keyof SignUpForm, value: string) => {
    console.log(value);
    setSignUpForm((prev) => {
      return {
        ...prev,
        [key]: { value: value, isValid: validateInput(key, value) },
      };
    });
  };
  return (
    <>
      <h1 className="mb-4">Sign up</h1>
      <form className="row" onSubmit={signup}>
        <div className="col-12 my-3">
          <TextField
            className="w-100"
            type="text"
            id="name"
            label="Name"
            value={signUpForm.name.value}
            onChange={(event) => changeFormHandler("name", event?.target.value)}
            error={!signUpForm.name.isValid}
          />
        </div>
        <div className="col-12 my-3">
          <TextField
            className="w-100"
            type="email"
            id="email"
            label="Email"
            value={signUpForm.email.value}
            onChange={(event) =>
              changeFormHandler("email", event?.target.value)
            }
            error={!signUpForm.email.isValid}
          />
        </div>
        <div className="col-12 my-3">
          <TextField
            className="w-100"
            type="password"
            id="password"
            label="Password"
            value={signUpForm.password.value}
            onChange={(event) =>
              changeFormHandler("password", event?.target.value)
            }
            error={!signUpForm.password.isValid}
          />
        </div>
        <div className="col-12 my-3">
          <Autocomplete
            disablePortal
            id="timezone"
            options={TIMEZONE_LIST}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Timezone" />}
            value={signUpForm.timezone.value}
            onChange={(_, newValue) => {
              changeFormHandler("timezone", newValue || "");
            }}
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
              Switch to log in
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignUp;
