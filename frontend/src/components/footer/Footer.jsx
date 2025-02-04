import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy;Sereen {new Date().getFullYear()} All Rights Reserved.</p>
        <Link to="/privacy-policy">Privacy Policy</Link>
      </div>
    </footer>
  );
};

export default Footer;
