import React, { useContext } from "react";
import { ShopContext } from "../../context/CreateContext.js";

const Orders = () => {
  const { orders, currency } = useContext(ShopContext);

  if (!orders.length)
    return <p className="mt-6 text-gray-500">You have no orders yet.</p>;

  return (
    <>
      <h1 className="font-bold text-xl md:text-2xl tracking-wide mb-4">
        Order History
      </h1>
      <div className="grid gap-4 md:gap-8">
        {orders
          .slice()
          .reverse()
          .map((order, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-2xl p-3 md:p-6 grid gap-4"
            >
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h1 className="font-semibold text-sm md:text-base">
                    Order #{order.orderNumber}
                  </h1>
                  <p className="text-gray-600 text-xs md:text-sm">
                    Placed on {order.orderDate}
                  </p>
                </div>
                <span
                  className={`text-xs md:text-sm rounded-full py-1 px-2 md:px-3 ${
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

              {order.products.map((item, i) => (
                <div key={i} className="flex items-center gap-2 md:gap-4">
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-16 h-full object-cover rounded-lg"
                  />
                  <div>
                    <h1 className="font-medium text-sm md:text-base">
                      {item.name}
                    </h1>
                    <p className="text-gray-600 text-xs md:text-sm">
                      Size: {item.size}, Color: {item.color}, Qty:{" "}
                      {item.quantity}
                    </p>
                  </div>
                  <p className="ml-auto text-luxe md:text-lg font-medium md:font-semibold">
                    {currency}
                    {item.price * item.quantity}
                  </p>
                </div>
              ))}

              <div className="text-right mt-2 space-y-1 text-sm md:text-base">
                <p>
                  Subtotal: {currency}
                  {order.subtotal}
                </p>
                <p>
                  Shipping:{" "}
                  {order.shipping === 0
                    ? "Free"
                    : `${currency}${order.shipping}`}
                </p>
                <p>
                  Tax: {currency}
                  {order.tax}
                </p>
                <p className="font-semibold">
                  Total: {currency}
                  {order.totalPrice}
                </p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Orders;
