import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// icons
import { RiAddLine, RiDeleteBinLine, RiSubtractLine } from "react-icons/ri";
import { ShopContext } from "../../context/ShopContext";

const CartProducts = () => {
  const {
    products,
    currency,
    delivery_fee,
    addToCart,
    removeFromCart,
    removeItemFromCart,
    cartItems,
  } = useContext(ShopContext);

  const [cartList, setCartList] = useState([]);
  const [shipping, setShipping] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let temp = [];
    let subtotalCalc = 0;

    for (let itemId in cartItems) {
      for (let size in cartItems[itemId]) {
        for (let color in cartItems[itemId][size]) {
          let quantity = cartItems[itemId][size][color];
          // Only include items with quantity > 0
          if (quantity > 0) {
            let product = products.find((p) => p._id === itemId);
            if (product) {
              temp.push({
                ...product,
                size,
                color,
                quantity,
              });
              subtotalCalc += product.price * quantity;
            }
          }
        }
      }
    }

    // shipping logic
    let shippingCalc =
      subtotalCalc >= 2000
        ? delivery_fee + 20
        : subtotalCalc >= 100
        ? delivery_fee
        : 0;

    // tax logic (10% of subtotal)
    let taxCalc = Math.round(subtotalCalc * 0.1);

    setCartList(temp);
    setShipping(shippingCalc);
    setTax(taxCalc);
    setTotal(subtotalCalc + shippingCalc + taxCalc);
  }, [cartItems, products, delivery_fee]);

  // Enhanced delete function
  const handleDeleteItem = async (cartProduct) => {
    try {
      await removeItemFromCart(
        cartProduct._id,
        cartProduct.size,
        cartProduct.color
      );

      toast.success(`Removed ${cartProduct.name} from cart!`, {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to remove item from cart");
    }
  };

  // Handle quantity decrease
  const handleDecreaseQuantity = (cartProduct) => {
    if (cartProduct.quantity > 1) {
      removeFromCart(cartProduct._id, cartProduct.size, cartProduct.color, 1);
    } else {
      // If quantity is 1, remove completely
      handleDeleteItem(cartProduct);
    }
  };

  // Handle quantity increase
  const handleIncreaseQuantity = (cartProduct) => {
    addToCart(cartProduct._id, cartProduct.size, cartProduct.color, 1);
  };

  return (
    <>
      <div className="px-6 py-3 shadow rounded-lg">
        {cartList.length === 0 ? (
          <p className="text-center text-gray-600">Your Cart is Empty</p>
        ) : (
          cartList
            .slice()
            .reverse()
            .map((cartProduct) => (
              <div
                key={`${cartProduct._id}-${cartProduct.size}-${cartProduct.color}`}
                className="flex items-center gap-6 border-b-2 py-6"
              >
                <img
                  src={cartProduct.image[0]}
                  alt={cartProduct.name}
                  className="h-24 object-cover rounded-lg cursor-pointer"
                  onClick={() => navigate(`/product/${cartProduct._id}`)}
                />
                <div>
                  <h1 className="font-semibold text-lg">{cartProduct.name}</h1>
                  <p className="text-gray-600 text-sm">
                    {cartProduct.size}
                    {cartProduct.size && cartProduct.color && ","}
                    {cartProduct.color}
                  </p>
                  <h1 className="text-luxe mt-2 font-semibold text-lg">
                    {currency}
                    {cartProduct.price}
                  </h1>
                </div>

                {/* Quantity buttons */}
                <div className="ml-auto flex gap-4 items-center">
                  <div className="flex items-center border rounded-lg h-10">
                    <button
                      onClick={() => handleDecreaseQuantity(cartProduct)}
                      className="px-3 h-full place-content-center cursor-pointer hover:bg-gray-100 transition duration-200"
                    >
                      <RiSubtractLine />
                    </button>
                    <div className="border-x px-3 h-full place-content-center min-w-[40px] text-center">
                      {cartProduct.quantity}
                    </div>
                    <button
                      onClick={() => handleIncreaseQuantity(cartProduct)}
                      className="px-3 py-2 h-full place-content-center cursor-pointer hover:bg-gray-100 transition duration-200"
                    >
                      <RiAddLine />
                    </button>
                  </div>
                  <RiDeleteBinLine
                    onClick={() => handleDeleteItem(cartProduct)}
                    className="text-red-600 text-lg cursor-pointer md:hover:text-red-800 transition duration-200"
                    title="Remove from cart"
                  />
                </div>
              </div>
            ))
        )}
      </div>

      {/* Order Summary */}
      <div className="flex flex-col gap-4 shadow px-6 py-3 rounded-lg">
        <h1 className="text-xl font-semibold mb-3">Order Summary</h1>
        <div className="grid gap-4 mb-3">
          <div className="flex">
            <span>Subtotal</span>
            <span className="ml-auto">
              {currency}
              {total - shipping - tax}
            </span>
          </div>
          <div className="flex">
            <span>Shipping</span>
            <span className="ml-auto">
              {shipping === 0 ? "Free" : `${currency}${shipping}`}
            </span>
          </div>
          <div className="flex">
            <span>Tax</span>
            <span className="ml-auto">
              {currency}
              {tax}
            </span>
          </div>
        </div>
        <div className="flex font-semibold text-lg border-t pt-4">
          <h1>Total</h1>
          <h1 className="ml-auto">
            {currency}
            {total}
          </h1>
        </div>
        <input
          type="text"
          placeholder="Promo Code"
          className="rounded-xl border px-4 py-3 text-sm focus:outline-none focus:border-luxe transition duration-300"
        />
        <button className="text-luxe border-luxe border rounded-xl py-3 hover:bg-luxe hover:text-white transition duration-300">
          Apply Code
        </button>
        <button
          onClick={() => {
            if (cartList.length === 0) {
              toast.error("No products in cart to order!", {
                position: "top-right",
                autoClose: 3000,
              });
            } else {
              navigate("/place-order");
            }
          }}
          className="bg-luxe text-white rounded-xl py-4 hover:opacity-90 transition duration-300 font-semibold"
        >
          Proceed to Checkout
        </button>
      </div>
    </>
  );
};

export default CartProducts;
