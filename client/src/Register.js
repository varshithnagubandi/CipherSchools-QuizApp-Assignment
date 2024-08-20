import React, { useState } from "react";
import "./App.css";
import axios from "axios";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [notSuccess, setNotSuccess] = useState("");

  const inputHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const submitHandle = (event) => {
    event.preventDefault();
    if (data.password === data.confirmpassword) {
      axios
        .post("http://localhost:5500/students/add-student", data)
        .then(() => {
          alert("USER REGISTER SUCCESSFULLY");
        })
        .catch(() => {
          console.log("USER NOT REGISTERED");
        });
    } else {
      setNotSuccess("PASSWORD AND CONFIRM-PASSWORD NOT MATCHING");
    }
  };

  return (
    <div className="register-full">
      <div className="register-container">
        <div className="image-container">
          <img
            className="regi-log-pic"
            src="pics/regi-log-cs.jpeg"
            alt="cipherschool"
          />
        </div>
        <div className="register-box">
          <h2>REGISTRATION FORM</h2>
          <form onSubmit={submitHandle}>
            <label>USERNAME</label>
            <br />
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={inputHandler}
              placeholder="USERNAME"
              required
            />
            <br />
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
            <label>CONFIRM PASSWORD</label>
            <br />
            <input
              type="password"
              name="confirmpassword"
              value={data.confirmpassword}
              onChange={inputHandler}
              placeholder="CONFIRM PASSWORD"
              required
            />
            <br />
            <br />
            <input type="submit" value="REGISTER" />
          </form>
          <h4 className="error-message">{notSuccess}</h4>
        </div>
      </div>
    </div>
  );
};

export default Register;
