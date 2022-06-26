import { useContext } from "react";
import "./App.scss";
import Layout from "./components/Layout/Layout.component";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home.page";
import Stats from "./pages/stats/stats.page";
import "bootstrap/dist/css/bootstrap.min.css";
import Auth from "./pages/auth/auth.page";
import AuthContext from "./context/auth-context";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        {authCtx.isLoggedIn && <Route path="/" element={<Home />} />}
        {authCtx.isLoggedIn && <Route path="/stats" element={<Stats />} />}
        {!authCtx.isLoggedIn && <Route path="/auth" element={<Auth />} />}
        {authCtx.isLoggedIn && <Route path="*" element={<Navigate to="/" />} />}
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Layout>
  );
}

export default App;
