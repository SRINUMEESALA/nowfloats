import { useState } from "react";
import "./index.css";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const [upload, setUpload] = useState(null);
  {
    upload !== null && console.log(upload.type);
  }

  const onClickUploadData = async () => {
    if (upload === null) {
      return;
    }
    const imgRef = ref(storage, `images/posts/${upload.name + uuidv4()}`);
    try {
      const uploadingResult = await uploadBytes(imgRef, upload);

      const url = await getDownloadURL(uploadingResult.ref);
      console.log(url);
      alert("Uploading Done");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(upload);
  return (
    <div className="">
      <h1>Home</h1>
      <input
        type="file"
        accept="image/*,video/*"
        onChange={(event) => setUpload(event.target.files[0])}
      />
      <button className="btn btn-primary" onClick={onClickUploadData}>
        Upload
      </button>
    </div>
  );
};

export default Home;
