import React, { useState, useEffect } from "react";
import {
  LuEllipsisVertical,
  LuSearch,
  LuHammer,
  LuCheck,
  LuX,
} from "react-icons/lu";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingOrder, setEditingOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const token =
        localStorage.getItem("token") || localStorage.getItem("adminToken");

      if (!token) {
        setError("Authentication token not found");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "http://localhost:4000/api/order/list",
        {},
        {
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setOrders(response.data.orders || []);
      } else {
        setError(response.data.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch orders from server"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update order status
  const updateOrderStatus = async (orderId, status) => {
    try {
      const token =
        localStorage.getItem("token") || localStorage.getItem("adminToken");

      const response = await axios.post(
        "http://localhost:4000/api/order/status",
        {
          orderId: orderId,
          status: status,
        },
        {
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        // Update local state
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: status } : order
          )
        );
        setEditingOrder(null);
        setNewStatus("");
      } else {
        setError(response.data.message || "Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to update order status"
      );
    }
  };

  // Start editing status
  const startEditStatus = (order) => {
    setEditingOrder(order._id);
    setNewStatus(order.status);
  };

  // Cancel editing
  const cancelEditStatus = () => {
    setEditingOrder(null);
    setNewStatus("");
  };

  // Save status
  const saveStatus = (orderId) => {
    if (newStatus.trim()) {
      updateOrderStatus(orderId, newStatus);
    }
  };

  // Filter orders based on search term
  const filteredOrders = orders.filter((order) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      order._id?.toLowerCase().includes(searchLower) ||
      (order.userId &&
        typeof order.userId === "string" &&
        order.userId.toLowerCase().includes(searchLower)) ||
      order.status?.toLowerCase().includes(searchLower) ||
      order.paymentMethod?.toLowerCase().includes(searchLower)
    );
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Processing":
      case "Order Placed":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      case "Shipped":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate stats
  const totalOrders = orders.length;
  const completedOrders = orders.filter(
    (order) => order.status === "Delivered" || order.status === "Completed"
  ).length;
  const processingOrders = orders.filter(
    (order) =>
      order.status === "Processing" ||
      order.status === "Shipped" ||
      order.status === "Order Placed"
  ).length;
  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  // Refresh orders function
  const refreshOrders = () => {
    fetchOrders();
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxe mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading orders...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-red-800 font-semibold">
                Error Loading Orders
              </h3>
              <p className="text-red-600 text-sm mt-1">{error}</p>
            </div>
            <button
              onClick={refreshOrders}
              className="bg-red-100 text-red-800 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
        <button
          onClick={refreshOrders}
          className="bg-luxe text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
        >
          Refresh Orders
        </button>
      </div>

      {/* Order Management Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        {/* Section Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Order Management
            </h2>
            <div className="relative w-full md:w-80">
              <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search orders by ID, status, or payment method..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxe focus:border-transparent text-sm w-full"
              />
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                {orders.length === 0
                  ? "No orders found"
                  : "No orders match your search"}
              </p>
              {orders.length === 0 && (
                <button
                  onClick={refreshOrders}
                  className="mt-2 text-luxe hover:text-blue-800"
                >
                  Check again
                </button>
              )}
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                    Order ID
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                    User ID
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                    Items
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                    Amount
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                    Date
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                    Payment
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                    Method
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => (
                  <tr
                    key={order._id}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 ${
                      index === filteredOrders.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    {/* Order ID */}
                    <td className="py-4 px-6">
                      <span className="text-sm font-medium text-gray-800 font-mono">
                        {order._id
                          ? `#${order._id.slice(-8).toUpperCase()}`
                          : "N/A"}
                      </span>
                    </td>

                    {/* User ID */}
                    <td className="py-4 px-6">
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {order.userId
                            ? `User: ${order.userId.slice(-6)}`
                            : "N/A"}
                        </p>
                      </div>
                    </td>

                    {/* Items Count */}
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-600">
                        {order.items?.length || 0} items
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="py-4 px-6">
                      <span className="text-sm font-medium text-gray-800">
                        ${order.amount ? order.amount.toFixed(2) : "0.00"}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      {editingOrder === order._id ? (
                        <div className="flex items-center gap-2">
                          <select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                            className="text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-luxe"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Order Placed">Order Placed</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          <button
                            onClick={() => saveStatus(order._id)}
                            className="text-green-600 hover:text-green-800"
                          >
                            <LuCheck className="w-4 h-4" />
                          </button>
                          <button
                            onClick={cancelEditStatus}
                            className="text-red-600 hover:text-red-800"
                          >
                            <LuX className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status || "Order Placed"}
                        </span>
                      )}
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-600">
                        {formatDate(order.date)}
                      </span>
                    </td>

                    {/* Payment Status */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          order.payment
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.payment ? "Paid" : "Pending"}
                      </span>
                    </td>

                    {/* Payment Method */}
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-600">
                        {order.paymentMethod || "COD"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => startEditStatus(order)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 text-gray-600 hover:text-luxe"
                          title="Edit Status"
                        >
                          <LuHammer className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 text-gray-400 hover:text-gray-600">
                          <LuEllipsisVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Table Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              Showing {filteredOrders.length} of {orders.length} orders
            </p>
            {orders.length > 0 && (
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors duration-200">
                  Previous
                </button>
                <button className="px-3 py-1 text-sm bg-luxe text-white rounded hover:bg-blue-800 transition-colors duration-200">
                  1
                </button>
                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors duration-200">
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Total Orders
          </h3>
          <p className="text-3xl font-bold text-luxe">{totalOrders}</p>
          <p className="text-sm text-gray-600 mt-2">All orders</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Completed
          </h3>
          <p className="text-3xl font-bold text-green-600">{completedOrders}</p>
          <p className="text-sm text-gray-600 mt-2">Orders delivered</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Processing
          </h3>
          <p className="text-3xl font-bold text-blue-600">{processingOrders}</p>
          <p className="text-sm text-gray-600 mt-2">In progress</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600">{pendingOrders}</p>
          <p className="text-sm text-gray-600 mt-2">Awaiting action</p>
        </div>
      </div>
    </div>
  );
};

export default Orders;
