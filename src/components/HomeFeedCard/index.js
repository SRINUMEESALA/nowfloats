import "./index.css";
import Avatar from "@mui/material/Avatar";
import ReactPlayer from "react-player";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { connect } from "react-redux";
import Dialog from "@mui/material/Dialog";
import {
  deepOrange,
  deepPurple,
  lightBlue,
  lightGreen,
  cyan,
} from "@mui/material/colors";
import { useState } from "react";

export const selectColor = (letter) => {
  switch (true) {
    case /[g-j]/.test(letter):
      return deepPurple[500];
    case /[k-o]/.test(letter):
      return deepOrange[500];
    case /[p-s]/.test(letter):
      return lightBlue[500];
    case /[t-x]/.test(letter):
      return lightGreen[500];
    default:
      return cyan[500];
  }
};

const HomeFeedCard = (props) => {
  const { author, content, fileType, sourceUrl, id } = props.eachFeedItem;
  const [addCommentDialog, setAddCommentDialog] = useState(false);
  const [comment, setComment] = useState("");

  const handleAddCommentDialog = () => {
    setAddCommentDialog(false);
  };

  const onClickPostCommentButton = () => {
    if (comment === "") {
      return;
    }
    let currentComments = props.comments;

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
    setAddCommentDialog(false);
    props.onClickPostComment(updatedComments);
  };

  const renderCommentDialogUi = () => (
    <Dialog open={addCommentDialog} onClose={handleAddCommentDialog}>
      <div className="p-4 dialogCon d-flex flex-column">
        <h1 className="h2 text-center mb-3">Add Comment</h1>
        <div className="form-group textAreaCon">
          <textarea
            className="form-control h-100"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Start typing your comment"></textarea>
        </div>
        <Button
          variant="contained"
          className="align-self-end"
          onClick={onClickPostCommentButton}>
          Post
        </Button>
      </div>
    </Dialog>
  );

  const renderImage = () => (
    <div className="mt-2 mb-2">
      <img alt="feedPicture" className="feedImage" src={sourceUrl} />
    </div>
  );

  const renderVideo = () => (
    <div className="responsive-container mt-2 mb-2">
      <ReactPlayer
        url={sourceUrl}
        controls={true}
        volume={0.5}
        className="w-100"
      />
    </div>
  );

  const onClickLikeButton = () => {
    props.likeButtonClicked(props.eachFeedItem.id);
  };

  const renderFeedCard = () => (
    <div className="homeFeedCardCon p-3 mt-3 mb-3">
      <div className="userDetCon d-flex ">
        <div className="d-none d-md-block">
          <Avatar sx={{ bgcolor: `${selectColor(author[0])}` }}>
            {author[0]}
          </Avatar>
        </div>

        <div className="ml-3 w-100">
          <Link to={`/content-details/${id}`} className="navLinkInFeedCard">
            <h1 className="h4">{author}</h1>
            <p className="text-secondary">{content}</p>
          </Link>
          {fileType === "video" ? renderVideo() : renderImage()}
          <div className="d-flex justify-content-end">
            <Button className="btn" onClick={onClickLikeButton}>
              <FavoriteBorderIcon
                className={`${props.likesList.includes(id) && "text-warning"}`}
              />
            </Button>

            <Button className="btn" onClick={() => setAddCommentDialog(true)}>
              <ChatBubbleOutlineIcon />
            </Button>
            <Tooltip
              title="This feature is currenly not available"
              placement="top"
              arrow>
              <Button className="btn">
                <ShareIcon />
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
      <>{renderCommentDialogUi()}</>
    </div>
  );

  return <>{renderFeedCard()}</>;
};

const mapStateToProps = (state) => {
  const { likesList, comments } = state;
  return {
    likesList,
    comments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    likeButtonClicked: (postId) => {
      dispatch({
        type: "onClickLikeButton",
        postId: postId,
      });
    },
    onClickPostComment: (updatedComments) =>
      dispatch({
        type: "postComment",
        updatedComments,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFeedCard);
