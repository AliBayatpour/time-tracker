import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth/auth.slice";
import { useState } from "react";
import {
  Divider,
  Drawer,
  Fab,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import {
  ChevronLeft,
  StackedBarChart,
  Menu,
  Logout,
  Home,
  Settings,
} from "@mui/icons-material";
import classes from "./header.module.scss";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const onLogoutHandler = () => {
    dispatch(authActions.logout());
    setShowSidebar(false);
  };

  const navigateAndClose = (navPath: string) => {
    navigate(navPath);
    setShowSidebar(false);
  };

  return (
    <>
      <Fab
        className={classes.menuBut}
        color="secondary"
        aria-label="add"
        onClick={() => setShowSidebar(true)}
        size="small"
      >
        <Menu />
      </Fab>
      <Drawer
        anchor={"left"}
        open={showSidebar}
        onClose={() => setShowSidebar(false)}
        sx={{
          "& .MuiDrawer-paper": { boxSizing: "border-box", minWidth: 320 },
        }}
      >
        <Toolbar>
          <div className="w-100 d-flex">
            <IconButton
              onClick={() => setShowSidebar(false)}
              className="ms-auto"
            >
              <ChevronLeft />
            </IconButton>
          </div>
        </Toolbar>
        <Divider />

        <ListItem>
          <ListItemButton onClick={() => navigateAndClose("/")}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => navigateAndClose("/statistics")}>
            <ListItemIcon>
              <StackedBarChart />
            </ListItemIcon>
            <ListItemText primary="Statistics" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => navigateAndClose("/settings")}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={onLogoutHandler}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </Drawer>
    </>
  );
};

export default Header;
