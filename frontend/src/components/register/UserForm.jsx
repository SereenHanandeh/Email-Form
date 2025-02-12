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
  const [notifications, setNotifications] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentSelection = (method) => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }));
    setShowModal(false);
  };

  const showNotification = (message, type) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type, hidden: false }]);

    setTimeout(() => {
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, hidden: true } : notif
        )
      );
    }, 2500); // الإشعار سيختفي بعد 2.5 ثانية

    setTimeout(() => {
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    }, 3000); // حذف الإشعار بعد 3 ثوانٍ
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
        onSuccess={() =>
          showNotification("✔ User registered successfully", "success")
        }
        onError={(error) => showNotification(error, "error")}
      />

      {formData.paymentMethod && (
        <SendEmail
          formData={formData}
          onSuccess={() =>
            showNotification("📧 Email sent successfully", "success")
          }
          onError={(error) => showNotification(error, "error")}
        />
      )}
   

      {/* 🔹 إشعارات التنبيهات */}
      <div className="notifications-container">
        {notifications.map((notif) => (
          <div key={notif.id} className={`notification ${notif.type}`}>
            <span>{notif.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserForm; 