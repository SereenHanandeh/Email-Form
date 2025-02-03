import React, { useState } from "react";
import RegisterUser from "./RegisterUser";
import SendEmail from "./SendEmail";
import GetPaymentMethods from "./GetPaymentMethod";
import PaymentModal from "./PaymentModel";

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    mobile: "",
    email: "",
    paymentMethod: "",
  });
  const [showModal, setShowModal] = useState(false); // للتحكم في ظهور الـ modal
  const [message, setMessage] = useState(""); // لتخزين الرسائل (مثل النجاح أو الفشل)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // هذه الدالة لتحديث اختيار طريقة الدفع
  const handlePaymentSelection = (method) => {
    setFormData((prev) => ({ ...prev, paymentMethod: method })); // تحديث طريقة الدفع
    setShowModal(false); // إغلاق الـ modal بعد الاختيار
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="mobile"
        placeholder="Mobile"
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />

      {/* زر لاختيار طريقة الدفع */}
      <button onClick={() => setShowModal(true)}>Choose Payment Method</button>

      {/* عرض الـ modal عند النقر */}
      <PaymentModal show={showModal} onHide={() => setShowModal(false)}>
        <GetPaymentMethods onSelect={handlePaymentSelection} />
      </PaymentModal>

      {/* إرسال بيانات المستخدم بعد اختيار طريقة الدفع */}
      <RegisterUser
        userData={formData}
        onSuccess={() => setMessage("User registered successfully!")}
        onError={(error) => setMessage(error)}
      />

      {/* إذا تم اختيار طريقة الدفع، يتم إرسال البريد الإلكتروني */}
      {formData.paymentMethod && (
        <SendEmail
          formData={formData}
          onSuccess={() => setMessage("Email sent successfully!")}
          onError={(error) => setMessage(error)}
        />
      )}

      {/* عرض الرسالة عند النجاح أو الفشل */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default UserForm;
