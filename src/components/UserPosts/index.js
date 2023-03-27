import { useEffect, useState } from "react";
import "./index.css";
import { apiStatusConstants, RenderFailureView, url } from "../../Source";
import Loader from "react-loader-spinner";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

const UserPosts = () => {
  const [userPostsApiStatus, setUserPostsApiStatus] = useState(
    apiStatusConstants.initial
  );
  const [posts, setPosts] = useState();

  const getUserPosts = async () => {
    setUserPostsApiStatus(apiStatusConstants.load);

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(
        `${url}/getFeed?onlyCurrentUserPosts=true&user=${Cookies.get(
          "currentUser"
        )}`,
        options
      );
      const result = await response.json();
      if (response.ok) {
        setUserPostsApiStatus(apiStatusConstants.success);

        setPosts(result);
      } else {
        setUserPostsApiStatus(apiStatusConstants.fail);
      }
    } catch (error) {
      console.log(error);
      setUserPostsApiStatus(apiStatusConstants.fail);
    }
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  const renderLoadingView = () => (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  );

  const renderEachUserPost = (postObj) => {
    const { date, content, sourceUrl, fileType, id } = postObj;
    let d = new Date(date.seconds * 1000);
    let postedDate = format(d, "MM/dd/yyyy");

    return (
      <Link
        to={`/content-details/${id}`}
        className="d-flex justify-content-center">
        <div className="border col-10 d-flex p-2  rounded">
          <div className="col-4">
            {fileType === "video" ? (
              <div className="responsive-container mt-2 mb-2">
                <ReactPlayer
                  url={sourceUrl}
                  controls={true}
                  volume={0.5}
                  className="w-100"
                />
              </div>
            ) : (
              <img className="w-100" src={sourceUrl} alt="postImage" />
            )}
          </div>
          <div className="col-8 d-flex flex-column">
            <p className="text-dark h6 align-self-end">{postedDate}</p>
            <p className="text-secondary">{content}</p>
          </div>
        </div>
      </Link>
    );
  };

  const renderSuccessView = () => {
    return (
      <ul className="d-flex justify-content-center mb-4 list-unstyled flex-column">
        {posts.length !== 0 ? (
          posts.map((postObj) => (
            <li key={uuidv4()} className="m-2">
              {renderEachUserPost(postObj)}
            </li>
          ))
        ) : (
          <div className="d-flex justify-content-center">
            <h1 className="text-secondary h2 mt-5">No Posts yet!</h1>
          </div>
        )}
      </ul>
    );
  };

  const renderUserPostsUI = () => {
    switch (userPostsApiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView();
      case apiStatusConstants.load:
        return renderLoadingView();
      case apiStatusConstants.fail:
        return <RenderFailureView callAgain={getUserPosts} />;
      default:
        return <></>;
    }
  };

  return <>{renderUserPostsUI()}</>;
};

export default UserPosts;
