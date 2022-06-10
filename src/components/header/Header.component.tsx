import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./Header.module.scss";

const Header: React.FC = () => {
  const authCtx = useContext(AuthContext);

  const onLogoutHandler = () => {
    authCtx.logout();
  };

  return (
    <header className={`${classes.header} pt-4`}>
      <nav className="d-flex container-lg">
        <Link to="/" className="me-5 btn btn-outline-secondary">
          <div className={classes.logo}>HOME</div>
        </Link>
        <Link to="/stats" className="me-5 btn btn-outline-secondary">
          Stats
        </Link>
        <button className="btn btn-outline-secondary" onClick={onLogoutHandler}>
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
