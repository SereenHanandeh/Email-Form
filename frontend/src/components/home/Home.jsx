import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Our Service!</h1>
      <p>
        We offer easy registration, payment method selection, and instant email
        confirmation. Our goal is to make your experience seamless and
        convenient. Start by registering today!
      </p>
      <Link to="/user-form">
        <button className="btn">Go to Registration</button>
      </Link>
    </div>
  );
};

export default HomePage;
