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
          <div className={classes.logo}>HOME</div>
        </Link>
        <Link to="/stats" className="me-5 btn btn-outline-light">
          Stats
        </Link>
        <button className="btn btn-outline-light" onClick={onLogoutHandler}>
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
