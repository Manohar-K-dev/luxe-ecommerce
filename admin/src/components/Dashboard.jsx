// import React from "react";

// const Dashboard = () => {
//   return (
//     <div className="p-6">
//       {/* Page Title */}
//       <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {/* Total Revenue Card */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
//               <h3 className="text-2xl font-bold text-gray-800">$448,742</h3>
//               <p className="text-sm text-green-600 mt-2">
//                 +12.5% from last month
//               </p>
//             </div>
//             <div className="bg-green-100 p-2 rounded-lg">
//               <svg
//                 className="w-6 h-6 text-green-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* Orders Card */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-sm text-gray-600 mb-1">Orders</p>
//               <h3 className="text-2xl font-bold text-gray-800">1,248</h3>
//               <p className="text-sm text-green-600 mt-2">
//                 +8.2% from last month
//               </p>
//             </div>
//             <div className="bg-blue-100 p-2 rounded-lg">
//               <svg
//                 className="w-6 h-6 text-blue-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* Products Card */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-sm text-gray-600 mb-1">Products</p>
//               <h3 className="text-2xl font-bold text-gray-800">324</h3>
//               <p className="text-sm text-gray-600 mt-2">Active products</p>
//             </div>
//             <div className="bg-purple-100 p-2 rounded-lg">
//               <svg
//                 className="w-6 h-6 text-purple-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* Customers Card */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-sm text-gray-600 mb-1">Customers</p>
//               <h3 className="text-2xl font-bold text-gray-800">8,429</h3>
//               <p className="text-sm text-green-600 mt-2">
//                 +5.7% from last month
//               </p>
//             </div>
//             <div className="bg-orange-100 p-2 rounded-lg">
//               <svg
//                 className="w-6 h-6 text-orange-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recent Orders Section */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
//         <h2 className="text-xl font-semibold text-gray-800 mb-6">
//           Recent Orders
//         </h2>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-gray-200">
//                 <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
//                   Order ID
//                 </th>
//                 <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
//                   Customer
//                 </th>
//                 <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
//                   Amount
//                 </th>
//                 <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
//                   Status
//                 </th>
//                 <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
//                   Date
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {/* Order 1 */}
//               <tr className="border-b border-gray-100 hover:bg-gray-50">
//                 <td className="py-3 px-4 text-sm text-gray-800">
//                   #LX-2024-089
//                 </td>
//                 <td className="py-3 px-4 text-sm text-gray-800">
//                   Sarah Johnson
//                 </td>
//                 <td className="py-3 px-4 text-sm text-gray-800">$547</td>
//                 <td className="py-3 px-4">
//                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                     Completed
//                   </span>
//                 </td>
//                 <td className="py-3 px-4 text-sm text-gray-600">
//                   Jan 30, 2024
//                 </td>
//               </tr>

//               {/* Order 2 */}
//               <tr className="border-b border-gray-100 hover:bg-gray-50">
//                 <td className="py-3 px-4 text-sm text-gray-800">
//                   #LX-2024-088
//                 </td>
//                 <td className="py-3 px-4 text-sm text-gray-800">
//                   Michael Chen
//                 </td>
//                 <td className="py-3 px-4 text-sm text-gray-800">$299</td>
//                 <td className="py-3 px-4">
//                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                     Processing
//                   </span>
//                 </td>
//                 <td className="py-3 px-4 text-sm text-gray-600">
//                   Jan 30, 2024
//                 </td>
//               </tr>

//               {/* Order 3 */}
//               <tr className="border-b border-gray-100 hover:bg-gray-50">
//                 <td className="py-3 px-4 text-sm text-gray-800">
//                   #LX-2024-087
//                 </td>
//                 <td className="py-3 px-4 text-sm text-gray-800">Emma Wilson</td>
//                 <td className="py-3 px-4 text-sm text-gray-800">$189</td>
//                 <td className="py-3 px-4">
//                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
//                     Pending
//                   </span>
//                 </td>
//                 <td className="py-3 px-4 text-sm text-gray-600">
//                   Jan 29, 2024
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      const token =
        localStorage.getItem("token") || localStorage.getItem("adminToken");

      // Fetch orders for stats and recent orders
      const ordersResponse = await axios.post(
        "http://localhost:4000/api/order/list",
        {},
        {
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (ordersResponse.data.success) {
        const orders = ordersResponse.data.orders || [];

        // Calculate total revenue
        const totalRevenue = orders.reduce(
          (sum, order) => sum + (order.amount || 0),
          0
        );

        // Get recent orders (last 3 orders)
        const recentOrders = orders.slice(0, 3);

        setStats({
          totalRevenue: totalRevenue,
          totalOrders: orders.length,
          totalProducts: 0, // You'll need to fetch products separately
          totalCustomers: 0, // You'll need to fetch customers separately
        });

        setRecentOrders(recentOrders);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Processing":
      case "Order Placed":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
        <div className="flex justify-center items-center py-8">
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Revenue Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {formatCurrency(stats.totalRevenue)}
              </h3>
              <p className="text-sm text-green-600 mt-2">
                +12.5% from last month
              </p>
            </div>
            <div className="bg-green-100 p-2 rounded-lg">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Orders Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600 mb-1">Orders</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {stats.totalOrders}
              </h3>
              <p className="text-sm text-green-600 mt-2">
                +8.2% from last month
              </p>
            </div>
            <div className="bg-blue-100 p-2 rounded-lg">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Products Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600 mb-1">Products</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {stats.totalProducts}
              </h3>
              <p className="text-sm text-gray-600 mt-2">Active products</p>
            </div>
            <div className="bg-purple-100 p-2 rounded-lg">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Customers Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600 mb-1">Customers</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {stats.totalCustomers}
              </h3>
              <p className="text-sm text-green-600 mt-2">
                +5.7% from last month
              </p>
            </div>
            <div className="bg-orange-100 p-2 rounded-lg">
              <svg
                className="w-6 h-6 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Recent Orders
        </h2>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Order ID
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Customer
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Amount
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="py-4 px-4 text-center text-sm text-gray-500"
                  >
                    No recent orders found
                  </td>
                </tr>
              ) : (
                recentOrders.map((order, index) => (
                  <tr
                    key={order._id || index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-sm text-gray-800">
                      #
                      {order._id
                        ? order._id.slice(-8).toUpperCase()
                        : `ORD${index}`}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800">
                      {order.userId
                        ? `User ${order.userId.slice(-6)}`
                        : "Unknown Customer"}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800">
                      {formatCurrency(order.amount || 0)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status || "Pending"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {formatDate(order.date)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
