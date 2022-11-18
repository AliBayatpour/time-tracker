import React from "react";
import { inputErrorMessages } from "../../../constants/input-error-messages-constants";
import styles from "./input.module.scss";

interface Props {
  type: string;
  id: string;
  value: string | number;
  name: string;
  onBlur: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
  onChange: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
  hasError: boolean;
  readonly?: boolean;
  defaultValue?: string | number;
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
        readOnly={!!props.readonly}
        defaultValue={props.defaultValue}
      />
      {props.hasError && (
        <p className={styles.errorText}>{errorMessageBuilder()}</p>
      )}
    </div>
  );
};

export default Input;
