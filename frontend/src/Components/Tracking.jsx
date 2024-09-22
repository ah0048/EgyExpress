import React, { useState, useEffect } from "react";
import "../css/Tracking.css";

function Tracking() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/tracking");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching tracking data:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="tracking-container">
      <h1>Tracking</h1>
      {orders.map((order) => (
        <div key={order.orderId} className="order-card">
          <p>
            <strong>Order ID:</strong> {order.orderId}
          </p>
          <p>
            <strong>Total Price:</strong> ${order.totalPrice}
          </p>
          <p
            className={`status ${
              order.status === "delivered" ? "delivered" : "not-delivered"
            }`}
          >
            <strong>Status:</strong> {order.status}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Tracking;
