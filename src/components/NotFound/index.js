import { Link } from "react-router-dom";
import "./index.css";

const NotFound = () => {
  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <div className="text-center d-flex flex-column">
        <div className="">
          <img
            className="w-100"
            alt="failureImage"
            src="https://img.freepik.com/premium-vector/error-404-page-found-natural-concept-illustration-web-missing-landing-page_607751-149.jpg?size=626&ext=jpg&uid=R96247835&ga=GA1.2.2024764164.1678773257&semt=ais"
          />
        </div>

        <div className="">
          <button type="button" className="btn btn-outline-warning btn-lg mt-3">
            <Link to="/" className="navLinkInNotFound">
              Home
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
