import React, { useState } from "react";
import axios from "axios";
import "./registerUser.css"; // استيراد ملف التصميم

const RegisterUser = ({ userData, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/users/register",
        userData
      );
      onSuccess(response.data);
    } catch (error) {
      onError(error.response?.data?.message || "Error registering user");
    }
    setLoading(false);
  };

  return (
    <button
      id="register-button"
      className={loading ? "loading" : ""}
      onClick={handleRegister}
      disabled={loading}
    >
      {loading ? <div className="spinner"></div> : "Register"}
    </button>
  );
};

export default RegisterUser;
