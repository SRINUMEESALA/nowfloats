import "./index.css";
import { HiOutlineMail } from "react-icons/hi";
import HttpsIcon from "@mui/icons-material/Https";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import UserPosts from "../UserPosts";
import { useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import TextField from "@mui/material/TextField";
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "../CreateContent";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import React from "react";
import Slide from "@mui/material/Slide";

let currentUser = Cookies.get("currentUser");

const Profile = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [email, setEmail] = useState(currentUser);
  const [ResetSnackBarAlert, setResetSnackBarAlert] = useState(false);
  const [snackProps, setSnackProps] = useState({ msg: "", color: "" });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setResetSnackBarAlert(false);
  };
  const renderSnackBar = () => {
    return (
      <Snackbar
        open={ResetSnackBarAlert}
        autoHideDuration={3000}
        onClose={handleClose}
        action={action}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        TransitionComponent={Slide}>
        <Alert severity={snackProps.color}>
          <span className="h6">{snackProps.msg}</span>
        </Alert>
      </Snackbar>
    );
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const resetPassword = async (event) => {
    event.preventDefault();
    if (email === "" || email !== currentUser) {
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSnackBarAlert(true);
      setOpenDialog(false);
      setSnackProps({
        msg: "An email with Reset link sent to your Email",
        color: "success",
      });
    } catch (error) {
      console.log(error);
      setResetSnackBarAlert(true);
      setOpenDialog(false);
      setSnackProps({ msg: "Something went wrong! Try again", color: "error" });
    }
  };

  const renderUserDetails = () => (
    <div className="d-flex justify-content-center align-items-center">
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
          </div>
        </div>
        <div className="d-flex mt-3">
          <div className="mr-3">
            <HttpsIcon className="h3 m-0 p-0 " />
          </div>
          <div className="">
            <p className="h3">Password</p>
            <h1 className="h5 m-0 text-secondary">xxxxxxxxx</h1>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <Link className="" onClick={() => setOpenDialog(!openDialog)}>
            Reset Password?
          </Link>
          <Modal
            dimmer="blurring"
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            style={{
              height: "30%",
              width: "40%",
              position: "absolute",
              top: "35%",
              left: "30%",
            }}>
            <Modal.Header className="text-center">Update Password</Modal.Header>
            <Modal.Content>
              <form className="d-flex flex-column align-items-center">
                <TextField
                  id="standard-basic"
                  label="Enter Email"
                  variant="standard"
                  className="w-50"
                  type="email"
                  value={email}
                  required
                  onChange={(event) => setEmail(event.target.value)}
                />
              </form>
            </Modal.Content>
            <Modal.Actions>
              <Button
                variant="contained"
                type="button"
                onClick={resetPassword}
                className="primary">
                Update
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
      </div>
      <>{renderSnackBar()}</>
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
