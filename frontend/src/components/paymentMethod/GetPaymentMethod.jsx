import React, { useEffect, useState } from "react";
import axios from "axios";
import "./getMethod.css";

const GetPaymentMethods = ({ onSelect }) => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        console.log("Fetching payment methods...");
        const response = await axios.get(
          "https://email-form-wkf3.onrender.com/payments"
        );
        console.log("Received payment methods:", response.data);

        setPaymentMethods(response.data);
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentMethods();
  }, []);

  return (
    <div>
      {loading ? (
        <p className="loader">Loading payment methods...</p>
      ) : (
        <ul className="payment-list">
          {paymentMethods.map((method) => (
            <li key={method._id} onClick={() => onSelect(method.method)}>
              {method.method}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetPaymentMethods;
