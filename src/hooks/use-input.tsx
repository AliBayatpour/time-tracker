import { useState } from "react";

const useInput = (validateValue: (val: string) => boolean) => {
  const [enteredValue, setEnteredValue] = useState<string>("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (
    event: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    setEnteredValue(event.target.value);
  };

  const defaultValueHandler = (value: string) => {
    setEnteredValue(value);
  };

  const inputBlurHandler = (
    event: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    isTouched,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    defaultValueHandler,
    reset,
  };
};

export default useInput;
