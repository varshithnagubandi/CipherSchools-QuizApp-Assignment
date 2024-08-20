import React, { useContext, useState, useEffect } from "react";
import { store } from "./App";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Myprofile.css";

const MyProfile = () => {
  const [token, setToken] = useContext(store);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5500/students/my-profile", {
        headers: {
          "x-token": token,
        },
      })
      .then((res) => setData(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  if (!token) {
    return <Navigate to="/" />;
  }

  const startTest = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      navigate("/start-quiz");
    } catch (err) {
      setError(
        "Permissions for webcam and microphone are required to start the test."
      );
    }
  };

  return (
    <div>
      {data && (
        <center>
          <img
            className="home-pic-style"
            src="pics/cipher-main-pic.jpg"
            alt="cipherschool"
            class="cipher-pic"
          />
          <h1>
            WELCOME STUDENT :{" "}
            <span className="profile-head">{data.name.toUpperCase()}</span>
          </h1>
          <div className="profile-div">
            <h1 className="heading-pro">TEST INSTRUCTIONS</h1>
            <h5 className="instructions">1. TEST CONTAINS 10 QUESTIONS</h5>
            <h5 className="instructions">2. EACH QUESTION CARRY 1 MARK</h5>
            <h5 className="instructions">3. NO NEGATIVE MARKING</h5>
            <h5 className="instructions">4. NAVIGATION IS ALLOWED</h5>
          </div>
          <button className="profile-button-start" onClick={startTest}>
            START TEST
          </button>
          {error && <h4 style={{ color: "red" }}>{error}</h4>}
          <br />
          <button className="profile-button-out" onClick={() => setToken(null)}>
            LOGOUT
          </button>
        </center>
      )}
    </div>
  );
};

export default MyProfile;
