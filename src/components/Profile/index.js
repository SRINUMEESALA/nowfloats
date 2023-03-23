import "./index.css";
import { HiOutlineMail } from "react-icons/hi";
import HttpsIcon from "@mui/icons-material/Https";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import UserPosts from "../UserPosts";

const Profile = () => {
  const renderUserDetails = () => (
    <div className="d-flex justify-content-center align-items-center  ">
      <div className="card col-5 p-4 shadow mt-4">
        <div className="d-flex mb-2">
          <div className="mr-3">
            <HiOutlineMail className="h2 m-0 p-0 text-dark" />
          </div>
          <div className="w-100">
            <p className="text-dark h3">Email</p>
            <h1 className="h5 m-0 text-secondary">
              {Cookies.get("currentUser")}
            </h1>
            {/* <h1 className="h5 mr-2">{`${user.email.slice(0, 21)}...`}</h1> */}
          </div>
        </div>
        <div className="d-flex mt-3">
          <div className="mr-3">
            <HttpsIcon className="h3 m-0 p-0 " />
            {/* <RiLockPasswordLine className="h3 m-0 p-0 text-secondary" /> */}
          </div>
          <div className="">
            <p className="h3">Password</p>
            <h1 className="h5 m-0 text-secondary">xxxxxxxxx</h1>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <Link className="">Reset Password?</Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="accountParentCon min-vh-10 mt-3 p-2">
      <div className="">
        <h2 className="">Manage account</h2>
        {renderUserDetails()}
        <h2 className="mt-5">Your Posts</h2>
        <UserPosts />
      </div>
    </div>
  );
};

export default Profile;
