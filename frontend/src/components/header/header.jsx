import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import lightLogo from "../header/logoD.png";
import darkLogo from "../header/logo.png";

const Header = ({ toggleTheme, theme }) => {
  return (
    <header className="header">
      <div className="logo-container">
        <img
          src={theme === "light" ? lightLogo : darkLogo}
          alt="Logo"
          className="logo"
        />
      </div>
      <div className="nav-container">
        <nav>
          <ul className="nav-list">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/user-form">Register</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <button className="theme-toggle" onClick={toggleTheme}>
                {theme === "light" ? "🌙" : "🌞"}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
