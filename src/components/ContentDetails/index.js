import "./index.css";
import Avatar from "@mui/material/Avatar";
import ReactPlayer from "react-player";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { apiStatusConstants, RenderFailureView, url } from "../../Source";
import { useParams } from "react-router-dom";
import Loader from "react-loader-spinner";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { selectColor } from "../HomeFeedCard";

const ContentDetails = (props) => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [comment, setComment] = useState("");
  const [postDetailsApiStatus, setPostDetailsApiStatus] = useState(
    apiStatusConstants.initial
  );
  const [details, setDetails] = useState({});
  const { id } = useParams();

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

  const onClickAddCommentButton = () => {
    setIsAddingComment(true);
  };

  const onClickPostCommentButton = () => {
    if (comment === "") {
      setIsAddingComment(false);
      return;
    }
    let currentComments = props.comments;
    // console.log("Before", comment, currentComments);
    const updatedComments = currentComments.map((each) => {
      if (each.postId === id) {
        let newCommentsList = [...each.commentsList, comment];
        setComment("");
        return { ...each, commentsList: newCommentsList };
      } else {
        setComment("");
        return { postId: id, commentsList: [comment], date: new Date() };
      }
    });

    // console.log("After", updatedComments);
    props.onClickPostComment(updatedComments);
    setIsAddingComment(false);
  };

  const renderComments = (currentPost) => {
    if (currentPost === undefined) {
      return (
        <div className="mt-4 border commentsCon d-flex justify-content-center align-items-center">
          <h1 className="h4 text-secondary text-center">No comments yet!</h1>
        </div>
      );
    }
    return (
      <ul className="mt-4 border  list-unstyled p-3 commentsDisplayCon">
        {currentPost.commentsList.map((eachComment) => (
          <li
            key={uuidv4()}
            className="p-3 mt-2 rounded"
            style={{
              backgroundColor: "rgba(0,0,0,0.1)",
              color: "rgb(0,30,60)",
            }}>
            <div className="d-flex justify-content-between">
              <p className="h6">{eachComment}</p>
              <p className="">
                {formatDistanceToNow(new Date(currentPost.date))} ago
              </p>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  const renderSuccessView = () => {
    const { author, date, content, sourceUrl, fileType } = details;
    let showDate = new Date(date.seconds * 1000);
    let dateStr = formatDistanceToNow(showDate);
    console.log(dateStr);
    const currentPost = props.comments.filter((obj) => obj.postId === id)[0];
    return (
      <div className="min-vh-100 postDetailsCon mt-3 mb-3">
        <div className="homeFeedCardCon p-3 mt-3 mb-3">
          <div className="userDetCon d-flex">
            <Avatar sx={{ bgcolor: `${selectColor(author[0])}` }}>
              {author[0]}
            </Avatar>
            <div className="ml-3 w-100">
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
                {isAddingComment ? (
                  <Button
                    variant="contained"
                    size="small"
                    onClick={onClickPostCommentButton}>
                    Post
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    size="small"
                    onClick={onClickAddCommentButton}>
                    Add Comment
                  </Button>
                )}
              </div>
              {isAddingComment ? (
                <div className="form-group">
                  <textarea
                    className="form-control"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    placeholder="Write your comment here..."
                    rows="5"></textarea>
                </div>
              ) : (
                renderComments(currentPost)
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

const mapStateToProps = (state) => {
  const { comments } = state;
  return { comments };
};
const DispatchActionToReducer = (dispatch) => {
  return {
    onClickPostComment: (updatedComments) =>
      dispatch({
        type: "postComment",
        updatedComments,
      }),
  };
};

export default connect(
  mapStateToProps,
  DispatchActionToReducer
)(ContentDetails);
