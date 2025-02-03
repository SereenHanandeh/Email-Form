import React, { useState } from "react";
import axios from "axios";
import "./sendEmail.css";

const SendEmail = ({ formData, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);

  const handleSendEmail = async () => {
    setLoading(true);
    console.log("Sending data:", formData);
    try {
      const response = await axios.post(
        "http://localhost:5000/users/sendEmail",
        formData
      );
      onSuccess(response.data);
    } catch (error) {
      onError(error.response?.data?.message || "Error sending email");
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleSendEmail}
      className="send-email-button"
      disabled={loading}
    >
      {loading ? "Sending..." : "Send Email"}
    </button>
  );
};

export default SendEmail;
