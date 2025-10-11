// import React from "react";
// import {
//   LuTrendingUp,
//   LuTrendingDown,
//   LuShoppingCart,
//   LuUsers,
//   LuEye,
//   LuDollarSign,
// } from "react-icons/lu";
// // npm - recharts
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
// } from "recharts";

// const Analytics = () => {
//   const metrics = [
//     {
//       title: "Revenue Growth",
//       value: "+12.5%",
//       trend: "up",
//       icon: <LuTrendingUp className="w-5 h-5" />,
//       color: "text-green-600",
//       bgColor: "bg-green-100",
//     },
//     {
//       title: "Order Growth",
//       value: "+8.2%",
//       trend: "up",
//       icon: <LuShoppingCart className="w-5 h-5" />,
//       color: "text-blue-600",
//       bgColor: "bg-blue-100",
//     },
//     {
//       title: "Product Views",
//       value: "-2.4%",
//       trend: "down",
//       icon: <LuEye className="w-5 h-5" />,
//       color: "text-red-600",
//       bgColor: "bg-red-100",
//     },
//     {
//       title: "New Customers",
//       value: "+15.3%",
//       trend: "up",
//       icon: <LuUsers className="w-5 h-5" />,
//       color: "text-purple-600",
//       bgColor: "bg-purple-100",
//     },
//   ];

//   const kpis = [
//     {
//       title: "Average Order Value",
//       value: "$186",
//       change: "+42% from last month",
//       trend: "up",
//     },
//     {
//       title: "Conversion Rate",
//       value: "3.24%",
//       change: "-0.8% from last month",
//       trend: "down",
//     },
//     {
//       title: "Customer Retention",
//       value: "68%",
//       change: "-21% from last month",
//       trend: "down",
//     },
//     {
//       title: "Return Rate",
//       value: "2.8%",
//       change: "-0.4% from last month",
//       trend: "down",
//     },
//   ];

//   const revenueData = [
//     { month: "Jan", value: 4200 },
//     { month: "Feb", value: 3800 },
//     { month: "Mar", value: 5100 },
//     { month: "Apr", value: 4600 },
//     { month: "May", value: 5600 },
//     { month: "Jun", value: 6200 },
//   ];

//   const revenueMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

//   const categoryData = [
//     { name: "Women", value: 3400 },
//     { name: "Men", value: 2700 },
//     { name: "Kids", value: 1800 },
//     { name: "Accessories", value: 1400 },
//   ];

//   const maxRevenue = Math.max(...revenueData);
//   const maxCategory = Math.max(...categoryData.map((item) => item.value));

//   return (
//     <div className="p-6">
//       {/* Page Header */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>
//         <p className="text-gray-600 mt-2">
//           Track your store performance and key metrics
//         </p>
//       </div>

//       {/* Metrics Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {metrics.map((metric, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
//           >
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-sm text-gray-600 mb-1">{metric.title}</p>
//                 <h3
//                   className={`text-2xl font-bold ${
//                     metric.trend === "up" ? "text-green-600" : "text-red-600"
//                   }`}
//                 >
//                   {metric.value}
//                 </h3>
//               </div>
//               <div
//                 className={`p-3 rounded-lg ${metric.bgColor} ${metric.color}`}
//               >
//                 {metric.icon}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Charts and KPIs Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Revenue Trend Chart */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
//           <h2 className="text-lg font-semibold text-gray-800 mb-6">
//             Revenue Trend
//           </h2>
//           <div className="h-64">
//             {/* Chart Container */}
//             <div className="h-64">
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={revenueData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="month" />
//                   <YAxis />
//                   <Tooltip />
//                   <Line
//                     type="monotone"
//                     dataKey="value"
//                     stroke="#0f172a"
//                     strokeWidth={2}
//                     dot={{ r: 5 }}
//                     animationDuration={1500}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Y-axis labels */}
//             <div className="flex justify-between text-xs text-gray-500 mt-4 px-4">
//               <span>$0</span>
//               <span>$2,000</span>
//               <span>$4,000</span>
//               <span>$6,000</span>
//               <span>$8,000</span>
//             </div>
//           </div>
//         </div>

//         {/* Sales by Category Chart */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
//           <h2 className="text-lg font-semibold text-gray-800 mb-6">
//             Sales by Category
//           </h2>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={categoryData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar
//                   dataKey="value"
//                   fill="#0f172a"
//                   barSize={50}
//                   radius={[8, 8, 0, 0]}
//                   animationDuration={1500}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Key Performance Indicators */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 lg:col-span-2">
//           <h2 className="text-lg font-semibold text-gray-800 mb-6">
//             Key Performance Indicators
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {kpis.map((kpi, index) => (
//               <div
//                 key={index}
//                 className="text-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200"
//               >
//                 <h3 className="text-sm font-medium text-gray-600 mb-2">
//                   {kpi.title}
//                 </h3>
//                 <p className="text-2xl font-bold text-gray-800 mb-2">
//                   {kpi.value}
//                 </p>
//                 <p
//                   className={`text-xs ${
//                     kpi.trend === "up" ? "text-green-600" : "text-red-600"
//                   }`}
//                 >
//                   {kpi.change}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Additional Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Total Revenue</p>
//               <h3 className="text-2xl font-bold text-gray-800">$448,742</h3>
//             </div>
//             <LuDollarSign className="w-8 h-8 text-green-500" />
//           </div>
//           <p className="text-sm text-green-600 mt-2">+12.5% from last month</p>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Total Orders</p>
//               <h3 className="text-2xl font-bold text-gray-800">1,248</h3>
//             </div>
//             <LuShoppingCart className="w-8 h-8 text-blue-500" />
//           </div>
//           <p className="text-sm text-green-600 mt-2">+8.2% from last month</p>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Active Customers</p>
//               <h3 className="text-2xl font-bold text-gray-800">8,429</h3>
//             </div>
//             <LuUsers className="w-8 h-8 text-purple-500" />
//           </div>
//           <p className="text-sm text-green-600 mt-2">+15.3% from last month</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Analytics;

import React from "react";
import {
  LuTrendingUp,
  LuTrendingDown,
  LuShoppingCart,
  LuUsers,
  LuEye,
  LuDollarSign,
} from "react-icons/lu";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

const Analytics = () => {
  const metrics = [
    {
      title: "Revenue Growth",
      value: "+12.5%",
      trend: "up",
      icon: <LuTrendingUp className="w-5 h-5" />,
      color: "text-green-600",
      bgColor: "bg-green-100",
      borderColor: "border-green-200",
    },
    {
      title: "Order Growth",
      value: "+8.2%",
      trend: "up",
      icon: <LuShoppingCart className="w-5 h-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      borderColor: "border-blue-200",
    },
    {
      title: "Product Views",
      value: "-2.4%",
      trend: "down",
      icon: <LuEye className="w-5 h-5" />,
      color: "text-red-600",
      bgColor: "bg-red-100",
      borderColor: "border-red-200",
    },
    {
      title: "New Customers",
      value: "+15.3%",
      trend: "up",
      icon: <LuUsers className="w-5 h-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      borderColor: "border-purple-200",
    },
  ];

  const kpis = [
    {
      title: "Average Order Value",
      value: "$186",
      change: "+42% from last month",
      trend: "up",
      icon: <LuDollarSign className="w-4 h-4" />,
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "-0.8% from last month",
      trend: "down",
      icon: <LuTrendingUp className="w-4 h-4" />,
    },
    {
      title: "Customer Retention",
      value: "68%",
      change: "-21% from last month",
      trend: "down",
      icon: <LuUsers className="w-4 h-4" />,
    },
    {
      title: "Return Rate",
      value: "2.8%",
      change: "-0.4% from last month",
      trend: "down",
      icon: <LuTrendingDown className="w-4 h-4" />,
    },
  ];

  const revenueData = [
    { month: "Jan", revenue: 4200, target: 3800 },
    { month: "Feb", revenue: 3800, target: 4000 },
    { month: "Mar", revenue: 5100, target: 4500 },
    { month: "Apr", revenue: 4600, target: 4800 },
    { month: "May", revenue: 5600, target: 5200 },
    { month: "Jun", revenue: 6200, target: 5800 },
  ];

  const categoryData = [
    { name: "Women", value: 3400, color: "#ec4899" },
    { name: "Men", value: 2700, color: "#3b82f6" },
    { name: "Kids", value: 1800, color: "#10b981" },
    { name: "Accessories", value: 1400, color: "#8b5cf6" },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-800">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey === "revenue" ? "Revenue" : "Target"}: $
              {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const BarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-800">{label}</p>
          <p className="text-sm" style={{ color: payload[0].fill }}>
            Sales: ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Track your store performance and key metrics in real-time
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 lg:mb-8">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 font-medium">
                  {metric.title}
                </p>
                <h3
                  className={`text-xl sm:text-2xl font-bold ${
                    metric.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {metric.value}
                </h3>
              </div>
              <div
                className={`p-2 sm:p-3 rounded-lg ${metric.bgColor} ${metric.color} flex-shrink-0`}
              >
                {metric.icon}
              </div>
            </div>
            <div className="mt-3 sm:mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    metric.trend === "up" ? "bg-green-500" : "bg-red-500"
                  }`}
                  style={{
                    width: `${Math.min(
                      Math.abs(parseFloat(metric.value)),
                      100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
        {/* Revenue Trend Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Revenue Trend
            </h2>
            <div className="flex items-center gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-luxe rounded-full"></div>
                <span className="text-gray-600">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <span className="text-gray-600">Target</span>
              </div>
            </div>
          </div>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={revenueData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0f172a"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#0f172a" }}
                  activeDot={{ r: 6, fill: "#0f172a" }}
                  animationDuration={1500}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#9ca3af"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 3, fill: "#9ca3af" }}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales by Category Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Sales by Category
            </h2>
            <span className="text-xs sm:text-sm text-gray-600">
              Total: $
              {categoryData
                .reduce((sum, item) => sum + item.value, 0)
                .toLocaleString()}
            </span>
          </div>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip content={<BarTooltip />} />
                <Bar
                  dataKey="value"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6 lg:mb-8">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
          Key Performance Indicators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          {kpis.map((kpi, index) => (
            <div
              key={index}
              className="p-4 sm:p-6 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-gray-50/50 hover:to-white"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-600">
                  {kpi.title}
                </h3>
                <div
                  className={`p-2 rounded-lg ${
                    kpi.trend === "up"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {kpi.icon}
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                {kpi.value}
              </p>
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  kpi.trend === "up"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {kpi.trend === "up" ? (
                  <LuTrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <LuTrendingDown className="w-3 h-3 mr-1" />
                )}
                {kpi.change}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {[
          {
            title: "Total Revenue",
            value: "$448,742",
            change: "+12.5% from last month",
            icon: <LuDollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
            color: "text-green-500",
            bgColor: "bg-green-100",
          },
          {
            title: "Total Orders",
            value: "1,248",
            change: "+8.2% from last month",
            icon: <LuShoppingCart className="w-6 h-6 sm:w-8 sm:h-8" />,
            color: "text-blue-500",
            bgColor: "bg-blue-100",
          },
          {
            title: "Active Customers",
            value: "8,429",
            change: "+15.3% from last month",
            icon: <LuUsers className="w-6 h-6 sm:w-8 sm:h-8" />,
            color: "text-purple-500",
            bgColor: "bg-purple-100",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {stat.value}
                </h3>
                <p className="text-sm text-green-600 mt-2">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor} ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
