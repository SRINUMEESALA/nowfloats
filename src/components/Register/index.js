import { useState } from "react";
import "./index.css";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { apiStatusConstants } from "../../Source";
import LinearProgress from "@mui/material/LinearProgress";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const naviage = useNavigate();
  const [registerApiStatus, setRegisterApiStatus] = useState(
    apiStatusConstants.initial
  );

  const onClickSubmit = async (event) => {
    setRegisterApiStatus(apiStatusConstants.load);
    event.preventDefault();
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (response.user !== undefined) {
        console.log(response);
        alert("User Successfully registered.");
        naviage("/auth/login");
      } else {
        setIsInvalid(true);
      }
    } catch (error) {
      console.log(error);
      setIsInvalid(true);
    } finally {
      setRegisterApiStatus(apiStatusConstants.success);
    }
  };

  return (
    <div className="">
      <form onSubmit={onClickSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            required
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            required
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
          <small id="emailHelp" className="form-text text-muted">
            Keep strong password of atleast 6 characters
          </small>
        </div>

        <button type="submit" className="btn btn-primary w-100 mt-3">
          SignUp
        </button>
        {registerApiStatus === apiStatusConstants.load && <LinearProgress />}
        {isInvalid && (
          <small id="emailHelp" className="form-text text-danger">
            Please verify your credentials & try again.
          </small>
        )}
      </form>
    </div>
  );
};

export default Register;
