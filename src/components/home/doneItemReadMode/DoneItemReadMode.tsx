import { useState } from "react";
import { Item } from "../../../interfaces/item.interface";
import {
  Category,
  Timer,
  Description,
  Update,
  ExpandMore,
  ExpandLess,
  More,
} from "@mui/icons-material";
import {
  convertDateNumToTime,
  convertMinToReadable,
} from "../../../utils/date.utils";
import {
  Collapse,
  Divider,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { Edit, Menu as MenuIcon, Delete, Done } from "@mui/icons-material";
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
  const [openExpand, setOpenExpand] = useState(false);

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
        <div className="col-12">
          <TableContainer>
            <Table size="small">
              <TableBody>
                <TableRow hover>
                  <TableCell>
                    <div className="d-flex align-items-center">
                      <Tooltip title="Category">
                        <Category color="info" />
                      </Tooltip>
                      <Typography variant="subtitle2" className="ms-1">
                        {item.category}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="d-flex align-items-center">
                      <Tooltip title="Progress">
                        <Update color="info" />
                      </Tooltip>
                      <Typography variant="subtitle2" className="ms-1">
                        {convertMinToReadable(item.progress)}
                      </Typography>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="col-12">
          <ListItemButton onClick={() => setOpenExpand((prev) => !prev)}>
            <ListItemText secondary="More" />
            {openExpand ? (
              <ExpandLess color="info" />
            ) : (
              <ExpandMore color="info" />
            )}
          </ListItemButton>
        </div>
        <div className="col-12">
          <Collapse in={openExpand} timeout="auto" unmountOnExit>
            <div className="d-flex align-items-center px-2">
              <Tooltip title="Finished at">
                <Done color="info" />
              </Tooltip>
              <Typography variant="subtitle2" className="ms-1">
                {convertDateNumToTime(+item.finishedAt)}
              </Typography>
            </div>
            <Divider className="my-1" />
            <div className="d-flex align-items-center px-2">
              <Tooltip title="Description">
                <Description color="info" />
              </Tooltip>
              <Typography variant="subtitle2" className="ms-1">
                {item.description}
              </Typography>
            </div>
          </Collapse>
        </div>
      </div>
    </>
  );
};

export default DoneItemReadMode;
