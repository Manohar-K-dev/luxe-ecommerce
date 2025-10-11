import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext.jsx";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency, user } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrderData = async () => {
    try {
      if (!token || !user) {
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        { userId: user._id },
        { headers: { token } }
      );

      if (response.data.success) {
        setOrderData(response.data.orders || []);
      }
    } catch (error) {
      console.error(
        "Error loading orders:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token, user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <p className="text-gray-500">Loading orders...</p>
      </div>
    );
  }

  if (!orderData || orderData.length === 0) {
    return (
      <div className="text-center py-8">
        <h1 className="font-bold text-xl md:text-2xl tracking-wide mb-4">
          Order History
        </h1>
        <p className="text-gray-500">You have no orders yet.</p>
      </div>
    );
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateOrderTotal = (order) => {
    return order.items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  return (
    <>
      <h1 className="font-bold text-xl md:text-2xl tracking-wide mb-6">
        Order History
      </h1>
      <div className="grid gap-6">
        {orderData.map((order, index) => (
          <div
            key={order._id || index}
            className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="space-y-1">
                <h1 className="font-semibold text-lg">
                  Order #
                  {order._id
                    ? order._id.slice(-6).toUpperCase()
                    : `ORD${index + 1}`}
                </h1>
                <p className="text-gray-600 text-sm">
                  Placed on {formatDate(order.date)}
                </p>
                <p className="text-gray-600 text-sm">
                  Payment: {order.payment ? "Paid" : "Pending"} •{" "}
                  {order.paymentMethod}
                </p>
              </div>
              <span
                className={`text-sm font-medium rounded-full py-2 px-4 ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-800"
                    : order.status === "Shipped"
                    ? "bg-purple-100 text-purple-800"
                    : order.status === "Processing"
                    ? "bg-blue-100 text-blue-800"
                    : order.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Order Items */}
            <div className="space-y-4 mb-4">
              {order.items &&
                order.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 py-3 border-b border-gray-100"
                  >
                    <img
                      src={
                        item.image && item.image[0]
                          ? item.image[0]
                          : "/placeholder.jpg"
                      }
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h1 className="font-medium text-base">{item.name}</h1>
                      <p className="text-gray-600 text-sm">
                        Size: {item.size || "Default"}, Color:{" "}
                        {item.color || "Default"}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="text-luxe font-semibold">
                      {currency}
                      {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
            </div>

            {/* Order Summary */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">
                    Shipping Address:{" "}
                    {order.address
                      ? `${order.address.street}, ${order.address.city}, ${order.address.state} ${order.address.zipCode}`
                      : "Not specified"}
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <p className="font-semibold text-lg">
                    Total: {currency}
                    {order.amount
                      ? order.amount.toFixed(2)
                      : calculateOrderTotal(order).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Orders;
