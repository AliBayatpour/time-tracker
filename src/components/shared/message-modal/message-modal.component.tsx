import { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import ModalContext from "../../../context/modal-context";

const MessageModal: React.FC = () => {
  const modalCtx = useContext(ModalContext);

  return (
    <Modal
      show={modalCtx.showModal}
      onHide={() => modalCtx.onSetShowModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Timer in progress!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        If you want to start a new Item please Finish in progress item first
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => modalCtx.onSetShowModal(false)}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default MessageModal;
