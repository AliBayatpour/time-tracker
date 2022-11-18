import { Button } from "react-bootstrap";
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
  } = useInput(isNumWithLimit);

  let formIsValid = false;
  if (enteredRestIsValid) {
    formIsValid = true;
  }

  const onSetRestTime = (event: any) => {
    event.preventDefault();
    if (!enteredRestIsValid) {
      return;
    }
    localStorage.setItem("restTime", enteredRest);
  };
  return (
    <div className="container-lg text-light">
      <h1 className="mb-4">Settings</h1>
      <div className="row">
        <form onSubmit={onSetRestTime}>
          <div className="col-12 col-lg-2">
            <Input
              type="number"
              name="rest"
              id="restInput"
              value={enteredRest}
              onBlur={restBlurHandler}
              onChange={restChangeHandler}
              hasError={restHasError}
              defaultValue={
                localStorage.getItem("restTime")
                  ? Number(localStorage.getItem("restTime"))
                  : 5
              }
            />
          </div>
          <div className="col-12">
            <Button
              disabled={!formIsValid}
              type="submit"
              variant="primary"
              className="mt-3 text-white"
            >
              Change rest time
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Settings;
