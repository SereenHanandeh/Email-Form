import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_oldtuy6",
        "template_0jlo6rq",
        {
          ...formData,
          reply_to: formData.email,
        },
        "v7TtNqC5rTLo8UkY3"
      )
      .then(
        () => {
          showNotification("✔ Message Send successfully", "success");
          setFormData({ name: "", email: "", message: "" });
        },
        () => {
          showNotification("❌ An error occurred, please try again", "error");
        }
      );
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000); // Hide after 3s
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Send Message</button>
      </form>

      {notification && (
        <div className={`notification ${notification.type}`}>
          <span>{notification.message}</span>
        </div>
      )}
    </div>
  );
};

export default Contact;
