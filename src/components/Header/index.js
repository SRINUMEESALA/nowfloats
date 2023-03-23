import Button from "@mui/material/Button";
import "./index.css";
import { v4 as uuidv4 } from "uuid";
import { NavLink, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import Cookies from "js-cookie";
import LinearProgress from "@mui/material/LinearProgress";
import { useState } from "react";

const navItems = [
  { item: "Home", path: "/" },
  { item: "Create Content", path: "/create-content" },
  { item: "Profile", path: "/profile" },
];

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const logout = () => {
    setIsLoggedOut(true);
    setTimeout(() => {
      Cookies.remove("jwtToken");
      Cookies.remove("currentUser");
      navigate("/auth/login");
    }, 2000);
  };

  return (
    <>
      <div className="d-none d-md-block " style={{ color: "rgb(0,30,60)" }}>
        <div className="navParentCon d-flex justify-content-center">
          <div className="navbarCon d-flex justify-content-between">
            <h1 className="pt-3 pb-3 h2">
              <span className="text-primary">Now</span>Floats
            </h1>
            <div className="d-flex">
              <ul className="list-unstyled d-flex m-0 navItemsHolder">
                {navItems.map((eachItem) => (
                  <li
                    className="mr-5  p-2 d-flex align-items-center"
                    key={uuidv4()}>
                    <NavLink to={eachItem.path} className="navLinkCon">
                      <span>{eachItem.item}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
              <Button
                variant="contained"
                color="primary"
                className="btn btn-danger align-self-center"
                onClick={logout}
                type="button">
                <LogoutIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className=" d-md-none">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="www.google.com">
            <h1 className="pt-2 pb-2 h2">
              <span className="text-primary">Now</span>Floats
            </h1>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav text-center">
              {navItems.map((eachItem) => (
                <li className="p-2" key={uuidv4()}>
                  <NavLink to={eachItem.path} className="navLinkCon">
                    <span>{eachItem.item}</span>
                  </NavLink>
                </li>
              ))}
              <Button
                variant="contained"
                color="primary"
                className="btn btn-danger align-self-center"
                onClick={logout}
                type="button">
                <LogoutIcon />
              </Button>
            </ul>
          </div>
        </nav>
      </div>
      {isLoggedOut && <LinearProgress />}
    </>
  );
};

export default Header;
