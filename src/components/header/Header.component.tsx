import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth/auth.slice";
import Button from "../shared/button/Button.component";
import styles from "./header.module.scss";
import { ReactComponent as Home } from "../../assets/icons/home.svg";
import { ReactComponent as Settings } from "../../assets/icons/settings.svg";
import { ReactComponent as Charts } from "../../assets/icons/charts.svg";
import { ReactComponent as Logout } from "../../assets/icons/logout.svg";
import { useState } from "react";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const onLogoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <div
      className={`${styles.sidebar} ${
        styles[`sidebar--${showSidebar && "show"}`]
      } position-fixed bg-mirror-primary`}
    >
      <Button
        size="round"
        variant="tertiary"
        onClick={() => setShowSidebar((prev) => !prev)}
        className={`${styles.menuTrigger} ${
          styles[`menuTrigger--${showSidebar && "show"}`]
        }`}
      >
        <Logout />
      </Button>
      <nav className={`container`}>
        <div className="row">
          <div
            className={`${styles.sidebar__navBox} w-100 d-flex flex-column align-items-center justify-content-center`}
          >
            <Button
              size="round"
              className="mb-5"
              variant="tertiary"
              role="link"
              to="/"
            >
              <Home />
            </Button>
            <Button
              size="round"
              className="mb-5"
              variant="tertiary"
              role="link"
              to="/stats"
            >
              <Charts />
            </Button>
            <Button
              size="round"
              className="mb-5"
              variant="tertiary"
              role="link"
              to="/settings"
            >
              <Settings />
            </Button>
            <Button size="round" variant="tertiary" onClick={onLogoutHandler}>
              <Logout />
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
