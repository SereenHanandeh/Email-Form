import React from "react";
import "./about.css";

const About = () => {
  return (
    <div className="about-container">
      <h1>About Our Service</h1>
      <p>
        Our service provides a seamless and user-friendly experience for
        registration, payment method selection, and email confirmation. We aim
        to make the process simple and efficient for all users. Join us today
        and experience the best in service delivery!
      </p>

      <h2>How to Use the Application</h2>
      <ol className="how-to-use">
        <li>
          Register by filling out the required details in the sign-up form.
        </li>
        <li>Select your preferred payment method.</li>
        <li>Submit the form, and you will receive a confirmation email.</li>
        <li>
          Follow the instructions in the email to complete your registration.
        </li>
        <li>Enjoy our services and contact support if needed!</li>
      </ol>
    </div>
  );
};

export default About;
