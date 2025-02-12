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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🔹 تحديث بيانات الإدخال
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 اختيار وسيلة الدفع
  const handlePaymentSelection = (method) => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }));
    setShowModal(false);
  };

  // 🔹 عرض الإشعار
  const showNotification = (message, type) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type, hidden: false }]);

    setTimeout(() => {
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, hidden: true } : notif
        )
      );
    }, 2500);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    }, 3200); // زيادة الوقت لحذف الإشعار بعد انتهاء الأنيميشن
  };

  // 🔹 التحقق من إدخال جميع البيانات قبل إرسال الطلب
  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.age.trim() !== "" &&
      formData.mobile.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.paymentMethod.trim() !== ""
    );
  };

  // 🔹 عند الضغط على Submit
  const handleSubmit = async () => {
    if (!isFormValid()) {
      showNotification("⚠ Please fill in all fields", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      await RegisterUser({
        userData: formData,
        onSuccess: () => showNotification("✔ User registered successfully", "success"),
        onError: (error) => showNotification(error, "error"),
      });

      await SendEmail({
        formData: formData,
        onSuccess: () => showNotification("📧 Email sent successfully", "success"),
        onError: (error) => showNotification(error, "error"),
      });

      // إعادة تعيين النموذج بعد النجاح
      setFormData({
        name: "",
        age: "",
        mobile: "",
        email: "",
        paymentMethod: "",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="form-container">
      <h2 id="form-title">Register</h2>
      <input
        type="text"
        id="user-name"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        id="user-age"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        id="user-mobile"
        name="mobile"
        placeholder="Mobile"
        value={formData.mobile}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        id="user-email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      {/* 🔹 زر اختيار وسيلة الدفع */}
      <button
        id="payment-button"
        onClick={() => setShowModal(true)}
        disabled={!formData.name || !formData.age || !formData.mobile || !formData.email}
      >
        Choose Payment Method
      </button>

      {/* 🔹 عرض وسيلة الدفع المختارة */}
      {formData.paymentMethod && (
        <p style={{ color: "green", marginTop: "10px" }}>
          Selected Payment Method: {formData.paymentMethod}
        </p>
      )}

      <PaymentModal show={showModal} onHide={() => setShowModal(false)}>
        <GetPaymentMethods onSelect={handlePaymentSelection} />
      </PaymentModal>

      {/* 🔹 زر الإرسال النهائي */}
      <button
        id="payment-button"
        onClick={handleSubmit}
        disabled={!isFormValid() || isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>

      {/* 🔹 إشعارات التنبيهات */}
      <div className="notifications-container">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`notification ${notif.type} ${notif.hidden ? "hidden" : ""}`}
          >
            <span>{notif.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserForm;
