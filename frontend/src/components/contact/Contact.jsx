import React, { useState } from "react";
import emailjs from "emailjs-com"; 

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(""); // To handle form submission status

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Using EmailJS to send the email
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
        (response) => {
          console.log("SUCCESS:", response);
          setStatus("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" }); // Clear form after submission
        },
        (error) => {
          console.log("FAILED:", error);
          setStatus("Error sending message. Please try again.");
        }
      );
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
      {status && <p>{status}</p>}
    </div>
  );
};

export default Contact;
