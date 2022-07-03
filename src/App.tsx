import { useContext } from "react";
import "./App.scss";
import Layout from "./components/Layout/Layout.component";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home.page";
import Stats from "./pages/stats/stats.page";
import Auth from "./pages/auth/auth.page";
import AuthContext from "./context/auth-context";
import Settings from "./pages/settings/settings.page";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        {authCtx.isLoggedIn && <Route path="/" element={<Home />} />}
        {authCtx.isLoggedIn && <Route path="/stats" element={<Stats />} />}
        {authCtx.isLoggedIn && (
          <Route path="/settings" element={<Settings />} />
        )}
        {!authCtx.isLoggedIn && <Route path="/auth" element={<Auth />} />}
        {authCtx.isLoggedIn && <Route path="*" element={<Navigate to="/" />} />}
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Layout>
  );
}

export default App;
