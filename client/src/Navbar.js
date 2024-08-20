import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="headerSection">
      <div className="left">
        <h1>CIPHERSCHOOL SCHOLARSHIP TEST</h1>
      </div>
      <div className="right">
        <ul className="nav-ul">
          <li className="nav-list">
            <Link to="/" className="nav-link">
              HOME
            </Link>
          </li>
          <li className="nav-list">
            <Link to="/register" className="nav-link">
              REGISTER
            </Link>
          </li>
          <li className="nav-list">
            <Link to="/login" className="nav-link">
              LOGIN
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
