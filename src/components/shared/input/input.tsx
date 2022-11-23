import React, { useEffect } from "react";
import { inputErrorMessages } from "../../../constants/input-error-messages-constants";
import styles from "./input.module.scss";

type Props = {
  type: string;
  id: string;
  value: string | number;
  label: string;
  onBlur: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
  onChange: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
  hasError: boolean;
  readonly?: boolean;
  onDefaultValue?: (val: string) => void;
  defaultValue?: string;
  variant?: "primary" | "secondary" | "tertiary" | "basic";
};

const Input: React.FC<Props> = (props) => {
  useEffect(() => {
    if (props.defaultValue && props.onDefaultValue) {
      props.onDefaultValue(props.defaultValue);
    }
  }, []);

  const errorMessageBuilder = (): string => {
    if (props.label in inputErrorMessages) {
      return inputErrorMessages[props.label as keyof typeof inputErrorMessages];
    } else {
      return "";
    }
  };

  return (
    <div
      className={`${styles.formControl} ${
        props.hasError ? styles["formControl--invalid"] : undefined
      } ${styles["formControl--" + (props.variant ?? "basic")]} mb-2`}
    >
      <label htmlFor={props.id} className="mb-1">
        {props.label}:
      </label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onBlur={props.onBlur}
        onChange={props.onChange}
        readOnly={!!props.readonly}
        placeholder={props.label}
        className="py-1 px-2"
      />
      {props.hasError && errorMessageBuilder() && (
        <small className={`ps-1 pt-1 ${styles.errorText}`}>
          {errorMessageBuilder()}
        </small>
      )}
    </div>
  );
};

export default Input;
