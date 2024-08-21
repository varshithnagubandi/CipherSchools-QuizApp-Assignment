import React, { useState, useContext } from "react";
import "./login.css";
import axios from "axios";
import { store } from "./App";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [token, setToken] = useContext(store);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:5500/students/verify-login",
        data
      )
      .then((res) => setToken(res.data.token));
  };

  if (token) {
    return <Navigate to="/myprofile" />;
  }

  return (
    <div className="login-full">
      <div className="login-container">
        <div className="image-container">
          <img
            className="regis-log-pic"
            src="pics/regi-log-cs.jpeg"
            alt="cipherschool"
          />
        </div>
        <div className="login-box">
          <h2>LOGIN FORM</h2>
          <form onSubmit={submitHandler}>
            <label>EMAIL</label>
            <br />
            <input
              type="text"
              name="email"
              value={data.email}
              onChange={inputHandler}
              placeholder="EMAIL"
              required
            />
            <br />
            <label>PASSWORD</label>
            <br />
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={inputHandler}
              placeholder="PASSWORD"
              required
            />
            <br />
            <br />
            <input type="submit" value="LOGIN" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
