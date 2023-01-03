import { useState } from "react";
import { Item } from "../../../interfaces/item-interface";
import { Category, Timer, Description, Update } from "@mui/icons-material";
import {
  convertDateNumToTime,
  convertMinToReadable,
} from "../../../utils/date-utils";
import {
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import {
  Edit,
  Menu as MenuIcon,
  Delete,
  ContentCopy,
  Done,
} from "@mui/icons-material";
import { stringValueGenerator } from "../../../utils/string-value-generator-utils";
import { useSelector } from "react-redux";
import { selectTodoItems } from "../../../store/item/item.selector";
import { useDispatch } from "react-redux";
import { itemActions } from "../../../store/item/item.slice";
import AlertModal from "../../shared/alertModal/AlertModal";

type Props = {
  item: Item;
  goToEditMode: () => void;
};

const DoneItemReadMode: React.FC<Props> = ({ item, goToEditMode }) => {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const todoItems = useSelector(selectTodoItems);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteItem = () => {
    dispatch(itemActions.deleteItemStart(item));
    handleClose();
  };

  return (
    <>
      <AlertModal
        title="Delete item"
        body="Are you sure you want to delete this item?"
        handleClose={() => setShowAlertModal(false)}
        yesHandler={handleDeleteItem}
        showModal={showAlertModal}
      />
      <div className="d-flex space-between">
        <IconButton
          id="demo-positioned-button"
          aria-controls={!!anchorEl ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={!!anchorEl ? "true" : undefined}
          onClick={handleClick}
          aria-label="more"
          color="info"
        >
          <MenuIcon />
        </IconButton>
        <IconButton onClick={goToEditMode} aria-label="more" color="info">
          <Edit />
        </IconButton>
      </div>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={() => setShowAlertModal(true)}>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
      <Divider variant="middle" className="mb-3" />

      <div className="row">
        <div className="col-8">
          <div className="d-flex align-items-center">
            <Tooltip title="Category">
              <Category color="info" />
            </Tooltip>
            <p className="ms-1">{item.category}</p>
          </div>
        </div>
        <div className="col-4">
          <div className="d-flex align-items-center">
            <Tooltip title="Progress">
              <Update color="info" />
            </Tooltip>
            <p className="ms-1">{convertMinToReadable(item.progress)}</p>
          </div>
        </div>
        <div className="col-6">
          <div className="d-flex align-items-center mt-3">
            <Tooltip title="Finished at">
              <Done color="info" />
            </Tooltip>
            <p className="ms-1">{convertDateNumToTime(+item.finishedAt)}</p>
          </div>
        </div>
        <div className="col-12 mt-3">
          <div className="d-flex">
            <Tooltip title="Description">
              <Description color="info" />
            </Tooltip>
            <small className="ms-1 mt-1">{item.description}</small>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoneItemReadMode;
