import React from "react";
import Button from "../../components/shared/button/Button.component";
import Input from "../../components/shared/input/input";
import useInput from "../../hooks/use-input";
import { isNumWithLimit } from "../../utils/input-validators-utils";

const Settings: React.FC = () => {
  const {
    value: enteredRest,
    isValid: enteredRestIsValid,
    hasError: restHasError,
    valueChangeHandler: restChangeHandler,
    inputBlurHandler: restBlurHandler,
    defaultValueHandler: restDefaultValueHandler,
  } = useInput(isNumWithLimit);

  let formIsValid = false;
  if (enteredRestIsValid) {
    formIsValid = true;
  }

  const getRestTime = () => {
    const localValue = localStorage.getItem("restTime");
    return localValue ? localValue : "5";
  };

  const onSetRestTime = (event: any) => {
    event.preventDefault();
    if (!enteredRestIsValid) {
      return;
    }
    localStorage.setItem("restTime", enteredRest);
  };
  return (
    <React.Fragment>
      <h1 className="mb-4">Settings</h1>
      <div className="row">
        <form onSubmit={onSetRestTime}>
          <div className="col-12 col-lg-2">
            <Input
              type="number"
              label="Rest"
              id="restInput"
              value={enteredRest}
              onBlur={restBlurHandler}
              onChange={restChangeHandler}
              hasError={restHasError}
              onDefaultValue={restDefaultValueHandler}
              defaultValue={getRestTime()}
            />
          </div>
          <div className="col-12">
            <Button
              disabled={!formIsValid}
              type="submit"
              variant="primary"
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
