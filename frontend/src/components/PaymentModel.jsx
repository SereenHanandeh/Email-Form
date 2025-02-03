import React from "react";

const PaymentModal = ({ show, onHide, children }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-labelledby="modalTitle" aria-hidden={!show}>
      <div className="modal-content">
        <h3 id="modalTitle">Select Payment Method</h3>
        {children}
        <button onClick={onHide} className="close-button">Close</button>
      </div>
    </div>
  );
};

export default PaymentModal;
