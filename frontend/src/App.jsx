import React from "react";
import Header from "./components/Header";
import UserForm from "./components/UserForm";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  return (
    <>
      <Header />
      <main className="main-container">
        <UserForm />
      </main>
      <Footer />
    </>
  );
};

export default App;
