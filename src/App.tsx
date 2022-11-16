import "./App.scss";
import Layout from "./components/Layout/Layout.component";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/home/home.page";
import Stats from "./pages/stats/stats.page";
import Auth from "./pages/auth/auth.page";
import Settings from "./pages/settings/settings.page";
import { selectIsLoggedIn } from "./store/auth/auth.selector";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearAuthData, getAuthData } from "./utils/auth-utils";
import { authActions } from "./store/auth/auth.slice";

function App() {
  let logoutTimer: ReturnType<typeof setTimeout> | undefined;
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  // autologin
  useEffect(() => {
    loginHandler();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      loginHandler();
    }
  }, [isLoggedIn]);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    clearAuthData();
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
    <Layout>
      <Routes>
        {isLoggedIn && <Route path="/" element={<Home />} />}
        {isLoggedIn && <Route path="/stats" element={<Stats />} />}
        {isLoggedIn && <Route path="/settings" element={<Settings />} />}
        {!isLoggedIn && <Route path="/auth" element={<Auth />} />}
        {isLoggedIn && <Route path="*" element={<Navigate to="/" />} />}
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Layout>
  );
}

export default App;
