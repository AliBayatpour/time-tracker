import React from "react";
import { inputErrorMessages } from "../../../constants/input-error-messages-constants";
import styles from "./input.module.scss";

interface Props {
  type: string;
  id: string;
  value: string;
  name: string;
  onBlur: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
  onChange: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
  hasError: boolean;
}

const Input: React.FC<Props> = (props) => {
  const errorMessageBuilder = (): string => {
    if (props.name in inputErrorMessages) {
      return inputErrorMessages[props.name as keyof typeof inputErrorMessages];
    } else {
      return `${props.name} is not valid`;
    }
  };

  return (
    <div
      className={`${styles.formControl} ${
        props.hasError ? styles["formControl--invalid"] : undefined
      }`}
    >
      <label htmlFor={props.id}>{props.name}</label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onBlur={props.onBlur}
        onChange={props.onChange}
      />
      {props.hasError && (
        <p className={styles.errorText}>{errorMessageBuilder()}</p>
      )}
    </div>
  );
};

export default Input;
