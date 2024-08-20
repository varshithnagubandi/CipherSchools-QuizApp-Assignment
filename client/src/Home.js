import React from "react";
import "./Home.css";

const Home = () => {
  const clickHandle = () => {
    window.location.href = "https://www.cipherschools.com/";
  };

  return (
    <div className="home-container">
      <img
        className="home-pic-style"
        src="pics/cipher-main-pic.jpg"
        alt="cipherschool"
      />
      <h3 className="home-heading">FOR MORE KNOWLEDGE VISIT US</h3>
      <button onClick={clickHandle} className="home-button">
        GO TO WEBSITE
      </button>
    </div>
  );
};

export default Home;
