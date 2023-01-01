import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { isNumWithLimit } from "../../utils/input-validators-utils";

type Form = {
  rest: { value: string; isValid: boolean };
};

const formInitialState = {
  rest: { value: "", isValid: false },
};

const Settings: React.FC = () => {
  const [form, setForm] = useState<Form>(formInitialState);

  let formIsValid = false;
  if (form.rest.isValid) {
    formIsValid = true;
  }

  const getRestTime = () => {
    const localValue = localStorage.getItem("restTime");
    return localValue ? localValue : "5";
  };

  const onSetRestTime = (event: any) => {
    event.preventDefault();
    if (!form.rest.isValid) {
      return;
    }
    localStorage.setItem("restTime", form.rest.value);
  };

  const validateInput = (inputKey: keyof Form, value: string): boolean => {
    switch (inputKey) {
      case "rest":
        return isNumWithLimit(value);
      default:
        return false;
    }
  };

  const changeFormHandler = (key: keyof Form, value: string) => {
    setForm((prev) => {
      return {
        ...prev,
        [key]: { value: value, isValid: validateInput(key, value) },
      };
    });
  };

  return (
    <React.Fragment>
      <h1 className="mb-4">Settings</h1>
      <div className="row">
        <form onSubmit={onSetRestTime}>
          <div className="col-12 col-lg-2">
            <TextField
              type="number"
              label="Rest"
              id="restInput"
              value={form.rest.value}
              onChange={(event) =>
                changeFormHandler("rest", event?.target.value)
              }
              error={!form.rest.isValid}
              defaultValue={getRestTime()}
            />
          </div>
          <div className="col-12">
            <Button
              disabled={!formIsValid}
              type="submit"
              color="primary"
              variant="contained"
              className="mt-3"
            >
              Change rest time
            </Button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};
export default Settings;
