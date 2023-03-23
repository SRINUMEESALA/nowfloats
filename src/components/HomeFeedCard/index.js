import "./index.css";
import Avatar from "@mui/material/Avatar";
import ReactPlayer from "react-player";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { connect } from "react-redux";

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

const HomeFeedCard = (props) => {
  const { author, content, fileType, sourceUrl, id } = props.eachFeedItem;

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

  const onClickLikeButton = () =>
    props.likeButtonClicked(props.eachFeedItem.id);

  // console.log(props.likesList.includes(id));

  return (
    <div className="homeFeedCardCon p-3 mt-3 mb-3">
      <div className="userDetCon d-flex">
        <Avatar {...stringAvatar(author[0])} />
        <div className="ml-3">
          <Link to={`/content-details/${id}`} className="navLinkInFeedCard">
            <h1 className="h4">{author}</h1>
            <p className="text-secondary">{content}</p>
          </Link>
          {fileType === "video" ? renderVideo() : renderImage()}
          <div className="d-flex justify-content-end">
            <Button className="btn" onClick={onClickLikeButton}>
              <FavoriteBorderIcon
                className={props.likesList.includes(id) && "text-warning"}
              />
            </Button>
            <Button className="btn">
              <ChatBubbleOutlineIcon />
            </Button>
            <Button className="btn">
              <ShareIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { likesList } = state;
  return {
    likesList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    likeButtonClicked: (postId) => {
      console.log(postId);
      dispatch({
        type: "onClickLikeButton",
        postId: postId,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFeedCard);
