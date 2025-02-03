import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // استيراد المكونات المطلوبة
import Header from "./components/header/header";
import UserForm from "./components/register/UserForm";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home"; // استيراد صفحة "الصفحة الرئيسية"
import About from "./components/about/About"; // استيراد صفحة "عن"
import Contact from "./components/contact/Contact"; 
import Register from "./components/register/RegisterUser"
import "./App.css";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="main-container">
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/about" element={<About />} /> 
          <Route path="/contact" element={<Contact />} />
          <Route path="/user-form" element={<UserForm />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
