import React, { useEffect, useState } from "react";
import axios from "axios";

const GetPaymentMethods = ({ onSelect }) => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await axios.get("http://localhost:5000/payments");
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
        <p>Loading payment methods...</p>
      ) : (
        <ul>
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
