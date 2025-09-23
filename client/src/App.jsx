import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
// Other Pages
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Account from "./pages/Account.jsx";
import Like from "./pages/Like.jsx";
import Cart from "./pages/Cart.jsx";
import AllProducts from "./pages/AllProducts.jsx";
import Product from "./pages/ViewProduct.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import Navbar from "./components/Navbar.jsx";
// Context
import { CartContext } from "./context/CartContext.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
// npm for notification
import { ToastContainer } from "react-toastify";

const App = () => {
  const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {/* Notification - npm */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      {/* Navbar */}
      <Navbar />
      <Header />
      {/* All Pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Login />} />
        <Route path="/my-account" element={<Account />} />
        <Route path="/liked-products" element={<Like />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/:category" element={<AllProducts />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/place-order" element={<PlaceOrder />} />
      </Routes>
      <Footer />
    </CartContext.Provider>
  );
};

export default App;
