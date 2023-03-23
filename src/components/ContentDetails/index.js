import "./index.css";
import Avatar from "@mui/material/Avatar";
import ReactPlayer from "react-player";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { apiStatusConstants, RenderFailureView, url } from "../../Source";
import { useParams } from "react-router-dom";
import Loader from "react-loader-spinner";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const ContentDetails = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [comment, setComment] = useState("");
  const [postDetailsApiStatus, setPostDetailsApiStatus] = useState(
    apiStatusConstants.initial
  );
  const [details, setDetails] = useState({});
  const { id } = useParams();

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    let chooseColor = Cookies.get("currentUser")
      .split("", 10)
      .sort(() => Math.random() - 0.5)
      .join("")
      .slice(0);

    return {
      sx: {
        bgcolor: stringToColor(chooseColor),
      },
      children: `${name.split(" ")[0][0]}`,
    };
  }

  const renderImage = (sourceUrl) => (
    <div className="mt-2 mb-2">
      <img alt="feedPicture" className="feedImage" src={sourceUrl} />
    </div>
  );

  const renderVideo = (sourceUrl) => (
    <div className="responsive-container mt-2 mb-2">
      <ReactPlayer
        url={sourceUrl}
        controls={true}
        volume={0.5}
        className="w-100"
      />
    </div>
  );
  const getPostDetails = async () => {
    setPostDetailsApiStatus(apiStatusConstants.load);
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(`${url}/posts/${id}`, options);
      const result = await response.json();
      if (response.ok) {
        setPostDetailsApiStatus(apiStatusConstants.success);
        setDetails(result.data);
      } else {
        setPostDetailsApiStatus(apiStatusConstants.fail);
      }
    } catch (error) {
      console.log(error);
      setPostDetailsApiStatus(apiStatusConstants.fail);
    }
  };

  useEffect(() => {
    getPostDetails();
  }, []);

  const renderSuccessView = () => {
    const { author, date, content, sourceUrl, fileType } = details;
    let today = new Date(new Date() - date.seconds);
    let dateStr = formatDistanceToNow(today);

    return (
      <div className="min-vh-100 postDetailsCon mt-3 mb-3">
        <div className="homeFeedCardCon p-3 mt-3 mb-3">
          <div className="userDetCon d-flex">
            <Avatar {...stringAvatar(author[0])} />
            <div className="ml-3">
              <div className="d-flex justify-content-between mb-3 align-items-center">
                <div className="">
                  <h1 className="h4 m-0">{author}</h1>
                  <p className="text-secondary mt-1 small">{dateStr} ago</p>
                </div>

                <div className="ui labeled button">
                  <div className="ui red button">
                    <i className="heart icon"></i> Like
                  </div>
                  <p className="ui basic red label">100</p>
                </div>
              </div>

              <p className="text-secondary">{content}</p>
              {fileType === "video"
                ? renderVideo(sourceUrl)
                : renderImage(sourceUrl)}
              <div className="d-flex mt-4 justify-content-between mb-3">
                <h1 className="h5" style={{ color: "rgb(0,30,60" }}>
                  Comments
                </h1>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => setIsAddingComment((val) => !val)}>
                  {isAddingComment ? "Post" : " Add Comment"}
                </Button>
              </div>
              {isAddingComment ? (
                <div class="form-group">
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    placeholder="Write your comment here..."
                    rows="5"></textarea>
                </div>
              ) : (
                <div className="mt-4 border commentsCon d-flex justify-content-center align-items-center">
                  <h1 className="h4 text-secondary text-center">
                    No comments yet!
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderLoadingView = () => (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  );

  const renderPostDetailsUI = () => {
    switch (postDetailsApiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView();
      case apiStatusConstants.load:
        return renderLoadingView();
      case apiStatusConstants.fail:
        return <RenderFailureView callAgain={getPostDetails} />;
      default:
        return <></>;
    }
  };

  return <>{renderPostDetailsUI()}</>;
};

export default ContentDetails;
