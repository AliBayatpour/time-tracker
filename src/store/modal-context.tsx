import React, { ReactElement, useState } from "react";

interface ModalContextInterface {
  showModal: boolean;
  onSetShowModal: (val: boolean) => void;
}

const ModalContext = React.createContext<ModalContextInterface>({
  showModal: false,
  onSetShowModal: (val: boolean) => {},
});

type Props = {
  children: JSX.Element;
};

export const ModalContextProvider = (props: Props): ReactElement<any, any> => {
  const [showModal, setShowModal] = useState(false);

  const onSetShowModal = (val: boolean) => setShowModal(val);

  const contextVallue = {
    showModal: showModal,
    onSetShowModal: onSetShowModal,
  };
  return (
    <ModalContext.Provider value={contextVallue}>
      {props.children}
    </ModalContext.Provider>
  );
};
export default ModalContext;
