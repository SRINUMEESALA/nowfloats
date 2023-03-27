import "./index.css";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { apiStatusConstants, url } from "../../Source";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import React from "react";

export const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CreateContent = () => {
  const [upload, setUpload] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(apiStatusConstants.initial);
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [snackProps, setSnackProps] = useState({ msg: "", color: "" });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
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

  const renderSnackBar = (msg, color) => {
    return (
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        action={action}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={Slide}>
        <Alert severity={snackProps.color}>
          <span className="h6">{snackProps.msg}</span>
          <br></br>
          {upload !== null && upload.name}
        </Alert>
      </Snackbar>
    );
  };

  const onClickUploadData = async (event) => {
    event.preventDefault();
    setUploadStatus(apiStatusConstants.load);

    if (upload === null) {
      return;
    }

    const imgRef = ref(storage, `images/posts/${upload.name + uuidv4()}`);
    try {
      const uploadingResult = await uploadBytes(imgRef, upload);
      const mediaUrl = await getDownloadURL(uploadingResult.ref);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author: Cookies.get("currentUser"),
          sourceUrl: mediaUrl,
          content: description,
          fileType: upload.type.slice(0, 5),
        }),
      };
      const response = await fetch(`${url}/post`, options);
      const result = await response.json();
      // console.log(result)

      setDescription(null);
      setUploadStatus(apiStatusConstants.success);
      setSnackProps({ msg: "File successfully uploaded", color: "success" });
      setOpen(true);
      setUpload(null);
    } catch (error) {
      console.log(error);
      setUploadStatus(apiStatusConstants.fail);
      setSnackProps({ msg: "File upload failed", color: "error" });
      setOpen(true);
    }
  };

  const onFileSelect = (event) => {
    setUpload(event.target.files[0]);
    setSnackProps({ msg: "File successfully impported", color: "success" });
    setOpen(true);
  };

  const renderUploadForm = () => (
    <>
      <h1 className="h3 font-weight-bold">Create Post</h1>
      <form
        className="uploadCon col-6 p-5 rounded"
        onSubmit={onClickUploadData}>
        <div className="form-group">
          <label htmlFor="description " className="h5 text-secondary mb-3">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="6"
            required
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Share the love you experienced today.."></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="description " className="h5 text-secondary mb-3 mt-2">
            Upload
          </label>
          <div className="">
            <Button variant="contained" component="label" type="submit">
              Upload
              <input
                hidden
                accept="image/*,video/*"
                multiple
                type="file"
                onChange={onFileSelect}
              />
            </Button>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label">
              <input
                hidden
                accept="image/*,video/*"
                type="file"
                onChange={onFileSelect}
              />
              <PhotoCamera />
            </IconButton>
            <p className="text-secondary">{upload !== null && upload.name}</p>
          </div>
        </div>
        <Button
          variant="contained"
          sx={{ width: 200 }}
          color="secondary"
          type="submit"
          className="btn mt-4 float-right">
          Publish
        </Button>
      </form>
      {renderSnackBar()}
    </>
  );

  const renderUploadingView = () => (
    <div
      className="text-center shadow d-flex justify-content-center align-items-center"
      style={{ width: "300px", height: "300px" }}>
      <div>
        <CircularProgress />
        <h1 className="h3 text-primary">Uploading...</h1>
        <h1 className="h5 text-secondary">Please wait!</h1>
      </div>
    </div>
  );

  const renderUploadSuccessView = () => (
    <div className="text-center shadow-sm d-flex justify-content-center align-items-center p-3">
      <div>
        <img
          alt="uploadSuccessImage"
          className="uploadImage"
          src="https://img.freepik.com/premium-vector/illustration-vector-graphic-cartoon-character-cloud-storage_516790-1522.jpg?size=4096&ext=jpg&uid=R96247835&ga=GA1.2.2024764164.1678773257&semt=ais"
        />
        <h1 className="h3 text-primary font-weigth-bold">Upload Done!</h1>
        <Button
          variant="contained"
          onClick={() => setUploadStatus(apiStatusConstants.initial)}>
          Upload More
        </Button>
      </div>
      {renderSnackBar()}
    </div>
  );

  const renderUploadFailureView = () => (
    <div className="text-center shadow-sm d-flex justify-content-center align-items-center p-3">
      <div>
        <img
          alt="uploadFailureImage"
          className="uploadImage"
          src="https://img.freepik.com/premium-vector/file-transfer-error-illustration_77235-101.jpg?size=338&ext=jpg&uid=R96247835&ga=GA1.2.2024764164.1678773257&semt=ais"
        />
        <h1 className="h3 text-danger font-weigth-bold">Upload Failed!</h1>
        <Button
          variant="contained"
          onClick={() => setUploadStatus(apiStatusConstants.initial)}>
          Upload Again
        </Button>
      </div>
      {renderSnackBar()}
    </div>
  );

  const renderUploadUI = () => {
    switch (uploadStatus) {
      case apiStatusConstants.load:
        return renderUploadingView();
      case apiStatusConstants.success:
        return renderUploadSuccessView();
      case apiStatusConstants.fail:
        return renderUploadFailureView();
      default:
        return renderUploadForm();
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center uploadParentCon align-items-center">
      {renderUploadUI()}
    </div>
  );
};

export default CreateContent;
