import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../../store/auth/auth.slice";
import classes from "./Header.module.scss";

const Header: React.FC = () => {
  const dispatch = useDispatch();

  const onLogoutHandler = () => {
    dispatch(authActions.logout());
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
