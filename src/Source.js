import Button from "@mui/material/Button";

export const apiStatusConstants = {
  initial: "initial",
  load: "loading",
  success: "Succeeded",
  fail: "failed",
};

export const url = "http://localhost:4000";
// export const url = "https://nowfloatsbackend.onrender.com";

export const RenderFailureView = (props) => (
  <div className="failureViewCon d-flex justify-content-center align-items-center">
    <div className=" col-6">
      <img
        className="w-100"
        alt="failureImage"
        src="https://img.freepik.com/premium-vector/economic-crisis-concept_118813-12937.jpg?size=4980&ext=jpg&uid=R96247835&ga=GA1.1.2024764164.1678773257&semt=ais"
      />
      <p className="text-secondary text-center">
        Oops! We could not connect you.
      </p>
      <div className="text-center">
        <Button
          variant="outlined"
          className="btn"
          onClick={() => props.callAgain()}>
          Retry
        </Button>
      </div>
    </div>
  </div>
);
