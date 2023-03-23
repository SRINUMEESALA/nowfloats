import Cookies from "js-cookie";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import "./index.css";

const Authentication = () => {
  if (Cookies.get("jwtToken") !== undefined) {
    return <Navigate to="/" />;
  }

  const renderBasicHeader = () => (
    <div className="" style={{ backgroundColor: "#F0F0F0" }}>
      <h1 className="pt-3 pb-3 h2 ml-5">
        <span className="text-primary">Now</span>Floats
      </h1>
    </div>
  );

  const renderAuthentication = () => (
    <div className="d-flex flex-md-row flex-column align-items-center justify-content-center authenticationCon">
      <div className="col-6 text-center">
        <img
          className="w-75 loginIllustration"
          alt="loginImage"
          src="https://img.freepik.com/free-vector/account-concept-illustration_114360-399.jpg?w=740&t=st=1679468065~exp=1679468665~hmac=f83573a6cf92dc1e0b0615a1a55b8af5ba4c53d3bbc4ea5900563a387f3d83f5"
        />
      </div>
      <div className=" col-6 d-flex justify-content-center">
        <div className="border p-4 rounded  col-5">
          <div className="d-flex justify-content-between mb-4 ">
            <NavLink to="/auth/login" className="navLinkCon">
              <h1 className="h4">Login</h1>
            </NavLink>
            <div className="">|</div>
            <NavLink to="/auth/register" className="navLinkCon">
              <h1 className="h4">Register</h1>
            </NavLink>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-vh-100">
      {renderBasicHeader()}
      {renderAuthentication()}
    </div>
  );
};

export default Authentication;
