import React from "react";
import { motion } from "framer-motion";
import "./paymentMethod.css";

const PaymentModal = ({ show, onHide, children }) => {
  if (!show) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-labelledby="modalTitle"
      aria-hidden={!show}
    >
      <motion.div
        className="modal-content"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <h3 id="modalTitle">Select Payment Method</h3>
        {children}
        <button onClick={onHide} className="close-button">
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default PaymentModal;
