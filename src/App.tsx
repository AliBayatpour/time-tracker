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

function App() {
  let logoutTimer: ReturnType<typeof setTimeout> | undefined;

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    loginHandler();
  }, []);

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
    <Routes>
      <Route path="/" element={<Layout />}>
        {isLoggedIn && <Route index element={<Home />} />}
        {isLoggedIn && <Route path="stats" element={<Stats />} />}
        {isLoggedIn && <Route path="settings" element={<Settings />} />}
      </Route>
      {!isLoggedIn && <Route path="/auth" element={<Auth />} />}
    </Routes>
  );
}

export default App;
