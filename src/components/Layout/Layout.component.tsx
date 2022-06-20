import Header from "../header/Header.component";
import classes from "./layout.module.scss";
type Props = {
  children: JSX.Element;
};
const Layout: React.FC<Props> = (props) => {
  return (
    <div className={`bg-dark ${classes.mainContainer}`}>
      <Header />
      <main className="py-5">{props.children}</main>
    </div>
  );
};

export default Layout;
