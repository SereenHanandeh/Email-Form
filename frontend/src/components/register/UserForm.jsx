import React, { useState } from "react";
import RegisterUser from "./RegisterUser";
import SendEmail from "../sendEmail/SendEmail";
import GetPaymentMethods from "../paymentMethod/GetPaymentMethod";
import PaymentModal from "../paymentMethod/PaymentModel";
import "./userForm.css";

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    mobile: "",
    email: "",
    paymentMethod: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentSelection = (method) => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }));
    setShowModal(false);
  };

  return (
    <div id="form-container">
      <h2 id="form-title">Register</h2>
      <input
        type="text"
        id="user-name"
        name="name"
        placeholder="Name"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        id="user-age"
        name="age"
        placeholder="Age"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        id="user-mobile"
        name="mobile"
        placeholder="Mobile"
        onChange={handleChange}
        required
      />
      <input
        type="email"
        id="user-email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />

      <button id="payment-button" onClick={() => setShowModal(true)}>
        Choose Payment Method
      </button>

      <PaymentModal show={showModal} onHide={() => setShowModal(false)}>
        <GetPaymentMethods onSelect={handlePaymentSelection} />
      </PaymentModal>

      <RegisterUser
        userData={formData}
        onSuccess={() => setMessage("User registered successfully!")}
        onError={(error) => setMessage(error)}
      />

      {formData.paymentMethod && (
        <SendEmail
          formData={formData}
          onSuccess={() => setMessage("Email sent successfully!")}
          onError={(error) => setMessage(error)}
        />
      )}

      {message && <p id="message">{message}</p>}
    </div>
  );
};

export default UserForm;
