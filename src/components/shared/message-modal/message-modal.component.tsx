import { Button, Modal } from "react-bootstrap";

type Props = {
  onSetShowModal: (val: boolean) => void;
  showModal: boolean;
};

const MessageModal: React.FC<Props> = ({ onSetShowModal, showModal }) => {
  return (
    <Modal show={showModal} onHide={() => onSetShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Timer in progress!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        If you want to start a new Item please Finish in progress item first
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onSetShowModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default MessageModal;
