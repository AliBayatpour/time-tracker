import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth/auth.slice";
import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
  Palette,
} from "@mui/icons-material";
import classes from "./header.module.scss";
import { useNavigate } from "react-router-dom";
import { THEME_DATA } from "../../constants/themeNames.constant";
import { DarkMode, LightMode, NightsStay } from "@mui/icons-material";
import { settingsActions } from "../../store/settings/settings.slice";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [showThemePicker, setShowThemePicker] = useState<boolean>(false);

  const onLogoutHandler = () => {
    dispatch(authActions.logout());
    setShowSidebar(false);
  };

  const navigateAndClose = (navPath: string) => {
    navigate(navPath);
    setShowSidebar(false);
  };

  const handleSetTheme = (key: keyof typeof THEME_DATA) => {
    dispatch(settingsActions.setTheme(key));
    localStorage.setItem("theme", key);
  };

  const THEME_ICONS: {
    [key in keyof typeof THEME_DATA]: { icon: JSX.Element };
  } = {
    POWER_RANGERS: {
      icon: <LightMode />,
    },
    SANDY_BEACH: {
      icon: <LightMode />,
    },
    PINKY_CAT: {
      icon: <LightMode />,
    },
    GIPSY_KING: {
      icon: <LightMode />,
    },
    SUNNY_NIGHT: {
      icon: <DarkMode />,
    },
    PINK_WEREWOLF: {
      icon: <LightMode />,
    },
    SMOKY_WINTER: {
      icon: <NightsStay />,
    },
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
      <Fab
        className={classes.themeBut}
        color="secondary"
        aria-label="add"
        onClick={() => setShowThemePicker(true)}
        size="small"
      >
        <Palette />
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
          <ListItemButton onClick={onLogoutHandler}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </Drawer>

      <Dialog
        open={showThemePicker}
        onClose={() => setShowThemePicker(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="text-center" id="alert-dialog-title">
          Themes
        </DialogTitle>
        <DialogContent>
          {Object.values(THEME_DATA).map((value) => (
            <ListItem
              key={value.key}
              onClick={() =>
                handleSetTheme(value.key as keyof typeof THEME_DATA)
              }
            >
              <ListItemButton>
                <ListItemIcon>
                  {
                    THEME_ICONS[value.key as keyof typeof THEME_DATA]
                      .icon as JSX.Element
                  }
                </ListItemIcon>
                <ListItemText primary={value.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
