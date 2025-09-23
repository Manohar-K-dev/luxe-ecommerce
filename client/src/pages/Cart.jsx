import React from "react";
import CartProducts from "../components/sections/CartProducts.jsx";

const Cart = () => {
  return (
    <>
      <section className="flex flex-col gap-8 px-40 py-16">
        <h1 className="text-3xl font-[800]">Shopping Cart</h1>
        <div className="grid grid-cols-[1fr_0.5fr] gap-8">
          <CartProducts />
        </div>
      </section>
    </>
  );
};

export default Cart;
