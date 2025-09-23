import { useEffect, useState } from "react";
import { products } from "../assets/assets.js";
// Context
import { ShopContext } from "./CreateContext.js";

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const [cartItems, setCartItems] = useState({});
  const [orders, setOrders] = useState([]); // 🔹 store order history

  // ----------------- CART -----------------

  // Add to cart
  const addToCart = async (
    itemId,
    size = "default",
    color = "default",
    quantity = 1
  ) => {
    let cartData = structuredClone(cartItems);

    // Initialize product if not exist
    if (!cartData[itemId]) cartData[itemId] = {};

    // Initialize size if not exist
    if (!cartData[itemId][size]) cartData[itemId][size] = {};

    if (cartData[itemId][size][color]) {
      cartData[itemId][size][color] += quantity;
    } else {
      cartData[itemId][size][color] = quantity;
    }

    setCartItems(cartData);
  };

  // Remove from cart
  const removeFromCart = async (
    itemId,
    size = "default",
    color = "default",
    quantity = 1
  ) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]?.[size]?.[color]) {
      if (cartData[itemId][size][color] > quantity) {
        cartData[itemId][size][color] -= quantity;
      } else {
        delete cartData[itemId][size][color];
      }

      if (Object.keys(cartData[itemId][size]).length === 0) {
        delete cartData[itemId][size];
      }
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    }

    setCartItems(cartData);
  };

  // Total quantity for Navbar badge
  const totalQuantity = Object.values(cartItems).reduce((sum, sizeObj) => {
    return (
      sum +
      Object.values(sizeObj).reduce(
        (s, colorObj) =>
          s + Object.values(colorObj).reduce((q, val) => q + val, 0),
        0
      )
    );
  }, 0);

  // ----------------- ORDERS -----------------
  const addOrder = (order) => {
    setOrders((prev) => [...prev, order]);
    setCartItems({}); // optional: empty cart after order
  };

  const placeOrder = (cartList, total, currency) => {
    const newOrder = {
      orderNumber: Math.floor(Math.random() * 100000),
      orderDate: new Date().toLocaleDateString(),
      status: "Processing",
      products: cartList,
      totalPrice: `${currency}${total}`,
    };

    setOrders((prev) => [...prev, newOrder]);
    setCartItems({});
  };

  useEffect(() => {
    console.log("Cart Updated:", cartItems);
  }, [cartItems]);

  useEffect(() => {
    console.log("Orders Updated:", orders);
  }, [orders]);

  const value = {
    products,
    currency,
    delivery_fee,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    totalQuantity,
    orders,
    setOrders,
    placeOrder,
    addOrder,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
