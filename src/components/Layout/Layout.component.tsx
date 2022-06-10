import { Fragment } from "react";
import Header from "../header/Header.component";

type Props = {
  children: JSX.Element;
};
const Layout: React.FC<Props> = (props) => {
  return (
    <Fragment>
      <Header />
      <main className="my-5 py-5">{props.children}</main>
    </Fragment>
  );
};

export default Layout;
