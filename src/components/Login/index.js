import { useState } from "react";
import "./index.css";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { apiStatusConstants } from "../../Source";
import LinearProgress from "@mui/material/LinearProgress";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [loginApiStatus, setLoginApiStatus] = useState(
    apiStatusConstants.initial
  );
  const naviage = useNavigate();

  const setToken = (response) => {
    Cookies.set("jwtToken", response.user.accessToken, { expires: 30 });
    Cookies.set("currentUser", response.user.email, { expires: 30 });
  };

  const onClickSubmit = async (event) => {
    setLoginApiStatus(apiStatusConstants.load);
    event.preventDefault();
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response.user !== undefined) {
        console.log(response);
        setToken(response);
        naviage("/");
      } else {
        setIsInvalid(true);
      }
    } catch (error) {
      console.log(error);
      setIsInvalid(true);
    } finally {
      setLoginApiStatus(apiStatusConstants.success);
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
            required
            placeholder="Enter email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
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
            We respect your privacy.
          </small>
        </div>

        <button type="submit" className="btn btn-primary w-100 mt-3">
          Login
        </button>
        {loginApiStatus === apiStatusConstants.load && <LinearProgress />}
        {isInvalid && (
          <small id="emailHelp" className="form-text text-danger">
            Invalid credentials entered!
          </small>
        )}
      </form>
    </div>
  );
};

export default Login;
