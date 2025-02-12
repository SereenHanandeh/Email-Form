import React, { useState, useEffect } from "react";
import axios from "axios";
import "./sendEmail.css";

const SendEmail = ({ formData, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // حالة لتخزين الرسالة
  const [messageType, setMessageType] = useState(""); // نوع الرسالة (نجاح أو خطأ)
  const [showNotification, setShowNotification] = useState(false); // لإظهار الإشعار
  const handleSendEmail = async () => {
    setLoading(true);
    setMessage(""); // مسح أي رسالة سابقة
    setMessageType(""); // مسح نوع الرسالة السابق
    setShowNotification(false); // إخفاء الإشعار عند محاولة إرسال البيانات
    console.log("Sending data:", formData);

    try {
      const response = await axios.post(
        "https://email-form-wkf3.onrender.com/users/sendEmail",
        formData
      );
      // setMessage("Email sent successfully!");
      // setMessage(response.data.message);
      // /      onSuccess(response.data);
      // setShowNotification(true);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error sending email"); // رسالة الخطأ
      setMessageType("error");
      onError(error.response?.data?.message || "Error sending email");
      // setShowNotification(true); // إظهار الإشعار عند حدوث خطأ
    }

    setLoading(false);
  };

  // إخفاء الرسالة بعد مدة معينة
  useEffect(() => {
    if (message && showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false); // إخفاء الإشعار بعد 5 ثوانٍ
      }, 5000);

      return () => clearTimeout(timer); // تنظيف المؤقت عند تغيير الرسالة
    }
  }, [message, showNotification]); // تفعيل الـ useEffect عند تغيير الرسالة

  return (
    <div>
      <button
        onClick={handleSendEmail}
        className="send-email-button"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Email"}
      </button>
      {showNotification && (
        <div className={`message-container ${messageType}`}>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default SendEmail;
