import React from "react";
import { Link } from "react-router-dom";
import "./privacy-policy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <h1>Privacy Policy</h1>
      <p>
        Welcome to our Privacy Policy page. Your privacy is important to us.
        Here, we explain how we collect, use, and protect your information.
      </p>

      <div className="privacy-section">
        <h2>🔍 Information We Collect</h2>
        <p>
          We collect user information such as name, email, and usage data to improve our services.
        </p>
      </div>

      <div className="privacy-section">
        <h2>💡 How We Use Your Information</h2>
        <p>Your data is used for authentication, analytics, and improving user experience.</p>
      </div>

      <div className="privacy-section">
        <h2>🔒 Security</h2>
        <p>We implement strong security measures to protect your data from unauthorized access.</p>
      </div>

      <p>
        If you have any questions, feel free to <Link to="/contact">contact us</Link>.
      </p>

      <Link to="/" className="back-home">🏠 Back to Home</Link>
    </div>
  );
};

export default PrivacyPolicy;
