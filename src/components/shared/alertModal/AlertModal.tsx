import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

type Prop = {
  showModal: boolean;
  handleClose: () => void;
  body: string;
  title: string;
  yesHandler: () => void;
};
const AlertModal: React.FC<Prop> = ({
  showModal,
  handleClose,
  title,
  body,
  yesHandler,
}) => {
  return (
    <Dialog
      open={showModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{body}</DialogContent>
      <DialogActions>
        <Button onClick={yesHandler} variant="outlined">
          Yes
        </Button>
        <Button onClick={handleClose} variant="contained">
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertModal;
