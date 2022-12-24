import React, { ChangeEventHandler, useEffect } from "react";
import { Type } from "typescript";
import { inputErrorMessages } from "../../../constants/input-error-messages-constants";
import styles from "./input.module.scss";

type Props = {
  type?: string;
  id: string;
  value: string | number;
  label?: string;
  onBlur?: (event: React.FocusEvent<any>) => void;
  onChange: (event: React.FocusEvent<any>) => void;
  hasError?: boolean;
  readonly?: boolean;
  onDefaultValue?: (val: string) => void;
  defaultValue?: string;
  variant?: "primary" | "secondary" | "tertiary" | "basic";
  inputElement?: "input" | "textarea" | "select";
  options?: string[];
};

const Input: React.FC<Props> = ({ inputElement = "input", ...props }) => {
  useEffect(() => {
    if (props.defaultValue && props.onDefaultValue) {
      props.onDefaultValue(props.defaultValue);
    }
  }, []);

  const errorMessageBuilder = (): string => {
    if (props.label && props.label in inputErrorMessages) {
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
      {props.label && (
        <label htmlFor={props.id} className="mb-1">
          {props.label}:
        </label>
      )}
      {inputElement === "input" ? (
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
      ) : inputElement === "textarea" ? (
        <textarea
          id={props.id}
          value={props.value}
          onBlur={props.onBlur}
          onChange={props.onChange}
          readOnly={!!props.readonly}
          placeholder={props.label}
          className="py-1 px-2"
          rows={3}
        />
      ) : inputElement === "select" ? (
        <select value={props.value} onChange={props.onChange}>
          {props.options?.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      ) : null}
      {props.hasError && errorMessageBuilder() && (
        <small className={`ps-1 pt-1 ${styles.errorText}`}>
          {errorMessageBuilder()}
        </small>
      )}
    </div>
  );
};

export default Input;
