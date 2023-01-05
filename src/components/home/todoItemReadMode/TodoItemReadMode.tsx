import { useState } from "react";
import { Item } from "../../../interfaces/item-interface";
import {
  Category,
  Timer,
  Description,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { convertMinToReadable } from "../../../utils/date-utils";
import {
  Collapse,
  Divider,
  IconButton,
  ListItemButton,
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

const TodoItemReadMode: React.FC<Props> = ({ item, goToEditMode }) => {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const [openExpand, setOpenExpand] = useState(false);

  const todoItems = useSelector(selectTodoItems);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const generateSortValue = (): string => {
    const todoItemsLength = todoItems.length;
    return todoItemsLength
      ? stringValueGenerator(todoItems[todoItemsLength - 1].sort)
      : stringValueGenerator();
  };

  const duplicateItem = () => {
    let newItem: Item = {
      userId: localStorage.getItem("sub") as string,
      category: item.category,
      description: item.description,
      sort: generateSortValue(),
      progress: 0,
      goal: Number(item.goal),
      done: false,
      finishedAt: "0",
    };

    dispatch(itemActions.addItemStart(newItem));
    handleClose();
  };

  const handleDeleteItem = () => {
    dispatch(itemActions.deleteItemStart(item));
    handleClose();
  };

  const handleMarkAsComplete = () => {
    let updatedItem: Item = {
      ...item,
      finishedAt: new Date().getTime().toString(),
      done: true,
      progress: item.goal,
    };
    dispatch(itemActions.updateItemStart(updatedItem));
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
          color="secondary"
        >
          <MenuIcon />
        </IconButton>
        <IconButton onClick={goToEditMode} aria-label="more" color="secondary">
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
        <MenuItem onClick={duplicateItem}>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Duplicate</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMarkAsComplete}>
          <ListItemIcon>
            <Done fontSize="small" />
          </ListItemIcon>
          <ListItemText>Complete</ListItemText>
        </MenuItem>
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
              <Category color="secondary" />
            </Tooltip>
            <p className="ms-1">{item.category}</p>
          </div>
        </div>
        <div className="col-4">
          <div className="d-flex align-items-center">
            <Tooltip title="Goal">
              <Timer color="secondary" />
            </Tooltip>
            <p className="ms-1">{convertMinToReadable(item.goal)}</p>
          </div>
        </div>
        <div className="col-12">
          <ListItemButton onClick={() => setOpenExpand((prev) => !prev)}>
            <ListItemText secondary="More" />
            {openExpand ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </div>
        <div className="col-12">
          <Collapse in={openExpand} timeout="auto" unmountOnExit>
            <div className="col-12 mt-3">
              <div className="d-flex">
                <Tooltip title="Description">
                  <Description color="secondary" />
                </Tooltip>
                <p className="ms-1">{item.description}</p>
              </div>
            </div>
          </Collapse>
        </div>
      </div>
    </>
  );
};

export default TodoItemReadMode;
