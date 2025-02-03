import React from "react";
import "./footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy;Sereen {new Date().getFullYear()} All Rights Reserved.</p>
        <a href="/privacy-policy">Privacy Policy</a>
      </div>
    </footer>
  );
};

export default Footer;
