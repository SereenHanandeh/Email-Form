import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import lightLogo from "../header/logoD.png";
import darkLogo from "../header/logo.png";

const Header = ({ toggleTheme, theme }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = (e) => {
    if (!e.target.closest(".nav-container") && menuOpen) {
      setMenuOpen(false);
    }
  };

  return (
    <header className="header" onClick={closeMenu}>
      <div className="logo-container">
        <img
          src={theme === "light" ? lightLogo : darkLogo}
          alt="Logo"
          className="logo"
        />
      </div>

      <button className="hamburger-menu" onClick={toggleMenu}>
        ☰
      </button>

      <div className={`nav-container ${menuOpen ? "active" : ""}`}>
        <nav>
          <ul className={`nav-list ${menuOpen ? "active" : ""}`}>
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/user-form" onClick={() => setMenuOpen(false)}>
                Register
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setMenuOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
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
