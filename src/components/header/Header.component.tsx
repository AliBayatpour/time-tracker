import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import classes from "./Header.module.scss";

const Header: React.FC = () => {
  const authCtx = useContext(AuthContext);

  const onLogoutHandler = () => {
    authCtx.logout();
  };

  return (
    <header className={`${classes.header} pt-4`}>
      <nav className="d-flex container-lg">
        <Link to="/" className="me-5 btn btn-outline-light">
          Home
        </Link>
        <Link to="/stats" className="me-5 btn btn-outline-light">
          Stats
        </Link>
        <Link to="/settings" className="me-5 btn btn-outline-light">
          Settings
        </Link>
        <button className="btn btn-outline-light" onClick={onLogoutHandler}>
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
