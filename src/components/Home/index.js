import { useEffect, useMemo, useState } from "react";
import "./index.css";
import { v4 as uuidv4 } from "uuid";
import HomeFeedCard from "../HomeFeedCard";
import { RenderFailureView, url } from "../../Source";
import { apiStatusConstants } from "../../Source";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";

const Home = () => {
  const [feed, setFeed] = useState([]);
  const [retrieveFeedApiStatus, setRetrieveFeedApiStatus] = useState(
    apiStatusConstants.initial
  );

  const renderFeedList = () => {
    const filteredFeed = feed.filter(
      (obj) => obj.author !== Cookies.get("currentUser")
    );
    return (
      <>
        {filteredFeed.map((eachFeedItem) => (
          <HomeFeedCard eachFeedItem={eachFeedItem} key={uuidv4()} />
        ))}
      </>
    );
  };

  const feedListMemo = useMemo(() => renderFeedList(), [feed]);

  const RetriveFeed = async () => {
    setRetrieveFeedApiStatus(apiStatusConstants.load);
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        `${url}/getFeed?user=${Cookies.get("currentUser")}`,
        options
      );
      const result = await response.json();
      if (response.ok) {
        setRetrieveFeedApiStatus(apiStatusConstants.success);
        setFeed(result);
      } else {
        setRetrieveFeedApiStatus(apiStatusConstants.fail);
      }
    } catch (error) {
      console.log(error);
      setRetrieveFeedApiStatus(apiStatusConstants.fail);
    }
  };

  useEffect(() => {
    RetriveFeed();
  }, []);

  const renderSuccessView = () => (
    <>
      <h1 className="h3 mt-3" style={{ color: "black" }}>
        Feed All You Love
      </h1>
      <div className="">
        <hr className="m-0 p-0" />
      </div>
      <div className="feedCon align-self-center">{feedListMemo}</div>
    </>
  );

  const EachSkeleton = () => (
    <div className="homeFeedCardCon p-3 mt-3 mb-3">
      <div className="userDetCon d-flex">
        <Skeleton variant="circular" width={42} height={40} className="mr-3" />
        <div className=" w-100">
          <Skeleton
            variant="text"
            sx={{ fontSize: "1.5rem", width: "12rem" }}
          />
          <div className="mb-2 mt-2">
            <Skeleton variant="text" sx={{ fontSize: "0.5rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "0.5rem" }} />
            <Skeleton
              variant="text"
              sx={{ fontSize: "0.5rem", width: "10rem" }}
            />{" "}
          </div>

          <Skeleton variant="rectangular" height={200} />
          <div className="d-flex justify-content-end mt-2">
            <Button className="btn">
              <Skeleton variant="circular" width={27} height={27} />
            </Button>
            <Button className="btn">
              <Skeleton variant="circular" width={27} height={27} />
            </Button>
            <Button className="btn">
              <Skeleton variant="circular" width={27} height={27} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLoadingView = () => (
    <>
      <h1 className="h3 mt-3" style={{ color: "black" }}>
        <Skeleton variant="text" sx={{ fontSize: "2rem", width: "15rem" }} />
      </h1>
      <div className="">
        <hr className="m-0 p-0" />
      </div>
      <div className="feedCon align-self-center">
        {Array.from({ length: 10 }).map(() => (
          <EachSkeleton key={uuidv4()} />
        ))}
      </div>
    </>
  );

  const renderFeedUI = () => {
    switch (retrieveFeedApiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView();
      case apiStatusConstants.load:
        return renderLoadingView();
      case apiStatusConstants.fail:
        return <RenderFailureView callAgain={RetriveFeed} />;
      default:
        return <></>;
    }
  };

  return <div className="homeCon d-flex flex-column">{renderFeedUI()}</div>;
};

export default Home;
