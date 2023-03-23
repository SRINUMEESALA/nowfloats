import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import "./index.css";

const WebLayout = () => {
  return (
    <div className="d-flex flex-column">
      <Header />
      <div className="contentCon align-self-center min-vh-100">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default WebLayout;
