import React from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.scss";

type Props = {
  onSetShowModal: (val: boolean) => void;
  showModal: boolean;
  children: JSX.Element[] | JSX.Element;
  label: string;
  variant?: "primary" | "secondary" | "tertiary" | "basic";
};

const Modal: React.FC<Props> = (props) => {
  const Backdrop = () => {
    return (
      <div
        className={`${styles.backdrop} position-fixed`}
        onClick={() => props.onSetShowModal(false)}
      ></div>
    );
  };

  const ModalOverlay = () => {
    return (
      <div
        className={`${styles.modal} ${
          styles["modal--" + (props.variant ?? "basic")]
        } w-100 position-fixed p-3`}
      >
        <h4 className={`${styles.modal__label}`}>{props.label}</h4>
        <div className={`${styles.modal__body}`}>{props.children}</div>
      </div>
    );
  };
  return props.showModal ? (
    <React.Fragment>
      {createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root") as HTMLElement
      )}
      {createPortal(
        <ModalOverlay />,
        document.getElementById("overlay-root") as HTMLElement
      )}
    </React.Fragment>
  ) : null;
};

export default Modal;
