import React from "react";
import {
  LuSearch,
  LuUser,
  LuMail,
  LuShoppingCart,
  LuDollarSign,
  LuCalendar,
  LuEllipsisVertical,
} from "react-icons/lu";

const Customers = () => {
  const customers = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarahj@email.com",
      orders: 12,
      totalSpent: "$2,847",
      status: "Active",
      joined: "Jan 15, 2023",
      avatar: "SJ",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.c@email.com",
      orders: 8,
      totalSpent: "$1,299",
      status: "Active",
      joined: "Mar 22, 2023",
      avatar: "MC",
    },
    {
      id: 3,
      name: "Emma Wilson",
      email: "emma.w@email.com",
      orders: 5,
      totalSpent: "$845",
      status: "Active",
      joined: "Jun 10, 2023",
      avatar: "EW",
    },
    {
      id: 4,
      name: "James Brown",
      email: "james.b@email.com",
      orders: 3,
      totalSpent: "$425",
      status: "Inactive",
      joined: "Aug 05, 2023",
      avatar: "JB",
    },
    {
      id: 5,
      name: "Lisa Anderson",
      email: "lisa.a@email.com",
      orders: 15,
      totalSpent: "$3,156",
      status: "Active",
      joined: "Feb 18, 2023",
      avatar: "LA",
    },
    {
      id: 6,
      name: "Robert Garcia",
      email: "robert.g@email.com",
      orders: 2,
      totalSpent: "$298",
      status: "Active",
      joined: "Nov 30, 2023",
      avatar: "RG",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-gray-100 text-gray-800";
      case "New":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getAvatarColor = (id) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-orange-500",
      "bg-pink-500",
      "bg-indigo-500",
    ];
    return colors[id % colors.length];
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <LuUser className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Customers</p>
              <h3 className="text-2xl font-bold text-gray-800">6</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <LuShoppingCart className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Active Customers</p>
              <h3 className="text-2xl font-bold text-gray-800">5</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <LuDollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Avg. Order Value</p>
              <h3 className="text-2xl font-bold text-gray-800">$236</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <LuCalendar className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">New This Month</p>
              <h3 className="text-2xl font-bold text-gray-800">1</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Customer List Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        {/* Section Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Customer List
            </h2>
            <div className="relative">
              <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search customers..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxe focus:border-transparent text-sm w-full lg:w-64"
              />
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                  Customer
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                  Email
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                  Orders
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                  Total Spent
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                  Status
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                  Joined
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                >
                  {/* Customer */}
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full ${getAvatarColor(
                          customer.id
                        )} flex items-center justify-center text-white font-medium text-sm`}
                      >
                        {customer.avatar}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-800">
                          {customer.name}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <LuMail className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                        {customer.email}
                      </span>
                    </div>
                  </td>

                  {/* Orders */}
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <LuShoppingCart className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                        {customer.orders}
                      </span>
                    </div>
                  </td>

                  {/* Total Spent */}
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <LuDollarSign className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-800">
                        {customer.totalSpent}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        customer.status
                      )}`}
                    >
                      {customer.status}
                    </span>
                  </td>

                  {/* Joined */}
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <LuCalendar className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                        {customer.joined}
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                      <LuEllipsisVertical className="w-5 h-5 text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden">
          {customers.map((customer) => (
            <div
              key={customer.id}
              className="border-b border-gray-100 p-4 hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full ${getAvatarColor(
                      customer.id
                    )} flex items-center justify-center text-white font-medium text-sm`}
                  >
                    {customer.avatar}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-800">
                      {customer.name}
                    </p>
                    <p className="text-xs text-gray-500">{customer.email}</p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    customer.status
                  )}`}
                >
                  {customer.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <LuShoppingCart className="w-4 h-4 text-gray-400 mr-2" />
                  <span>{customer.orders} orders</span>
                </div>
                <div className="flex items-center">
                  <LuDollarSign className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="font-medium">{customer.totalSpent}</span>
                </div>
                <div className="flex items-center">
                  <LuCalendar className="w-4 h-4 text-gray-400 mr-2" />
                  <span>{customer.joined}</span>
                </div>
                <div className="flex justify-end">
                  <button className="p-1 hover:bg-gray-100 rounded transition-colors duration-200">
                    <LuEllipsisVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Table Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              Showing {customers.length} customers
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors duration-200">
                Previous
              </button>
              <button className="px-3 py-1 text-sm bg-luxe text-white rounded hover:bg-blue-800 transition-colors duration-200">
                1
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors duration-200">
                2
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors duration-200">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
