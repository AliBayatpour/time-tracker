import "./App.scss";
import Layout from "./components/Layout/Layout.component";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/home/home.page";
import Stats from "./pages/stats/stats.page";
import Auth from "./pages/auth/auth.page";
import Settings from "./pages/settings/settings.page";
import { selectIsLoggedIn } from "./store/auth/auth.selector";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAccessToken, getAuthData } from "./utils/token-utils";
import { authActions } from "./store/auth/auth.slice";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  let logoutTimer: ReturnType<typeof setTimeout> | undefined;

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    loginHandler();
  }, []);

  const primaryTheme = createTheme({
    palette: {
      primary: {
        main: "#6c6dff",
      },
      secondary: {
        main: "#f50057",
      },
      info: {
        main: "#f7b801",
      },
    },
  });

  useEffect(() => {
    if (isLoggedIn) {
      loginHandler();
      navigate("/", { replace: true });
    } else if (!getAccessToken()) {
      logoutHandler();
    }
  }, [isLoggedIn]);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    handleClearTimeout();
    navigate("/auth", { replace: true });
  };

  const loginHandler = () => {
    const remainingTime = getAuthData()?.remainingTime;
    handleClearTimeout();
    if (remainingTime && remainingTime > 0) {
      dispatch(authActions.loginSuccess());
      logoutTimer = setTimeout(logoutHandler, remainingTime);
      navigate("/", { replace: true });
    }
  };

  const handleClearTimeout = () => {
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  };

  return (
    <ThemeProvider theme={primaryTheme}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {isLoggedIn && <Route index element={<Home />} />}
          {isLoggedIn && <Route path="stats" element={<Stats />} />}
          {isLoggedIn && <Route path="settings" element={<Settings />} />}
        </Route>
        {!isLoggedIn && <Route path="/auth" element={<Auth />} />}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
