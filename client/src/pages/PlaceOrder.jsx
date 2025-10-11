import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext.jsx";
import axios from "axios";

const PlaceOrder = () => {
  const {
    cartItems,
    products,
    currency,
    delivery_fee,
    placeOrder,
    user,
    loading,
    backendUrl,
    token,
  } = useContext(ShopContext);

  const navigate = useNavigate();

  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const [cartList, setCartList] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cod"); // "cod" or "stripe"
  const [stripeLoading, setStripeLoading] = useState(false);

  // Calculate order summary
  React.useEffect(() => {
    let temp = [];
    let subtotalCalc = 0;

    for (let itemId in cartItems) {
      for (let size in cartItems[itemId]) {
        for (let color in cartItems[itemId][size]) {
          let quantity = cartItems[itemId][size][color];
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
    setSubtotal(subtotalCalc);
    setShipping(shippingCalc);
    setTax(taxCalc);
    setTotal(subtotalCalc + shippingCalc + taxCalc);
  }, [cartItems, products, delivery_fee]);

  const handleInputChange = (field, value) => {
    setAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    // Validate address
    if (
      !address.street ||
      !address.city ||
      !address.state ||
      !address.zipCode ||
      !address.country ||
      !address.phone
    ) {
      toast.error("Please fill in all address fields");
      return;
    }

    if (cartList.length === 0) {
      toast.error("No items in cart to order");
      return;
    }

    try {
      if (paymentMethod === "cod") {
        // Cash on Delivery
        const result = await placeOrder(cartList, total, currency, address);

        if (result.success) {
          toast.success("Order placed successfully!");
          navigate("/my-account", {
            state: { activeTab: "orders" },
          });
        }
      } else if (paymentMethod === "stripe") {
        // Stripe Payment
        await handleStripePayment();
      }
    } catch (error) {
      console.error("Order placement error:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  const handleStripePayment = async () => {
    try {
      setStripeLoading(true);

      if (!user || !user._id) {
        toast.error("Please login to proceed with payment");
        return;
      }

      const orderData = {
        userId: user._id,
        items: cartList.map((item) => ({
          _id: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          image: item.image,
        })),
        amount: total,
        address: address,
      };

      const response = await axios.post(
        `${backendUrl}/api/order/stripe`,
        orderData,
        {
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        // Redirect to Stripe Checkout
        window.location.href = response.data.session_url;
      } else {
        toast.error(response.data.message || "Failed to initialize payment");
      }
    } catch (error) {
      console.error("Stripe payment error:", error);
      toast.error(
        error.response?.data?.message ||
          "Payment initialization failed. Please try again."
      );
    } finally {
      setStripeLoading(false);
    }
  };

  if (cartList.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No Items in Cart
          </h2>
          <p className="text-gray-600 mb-6">
            Please add some products to your cart before placing an order.
          </p>
          <button
            onClick={() => navigate("/all-Products")}
            className="bg-luxe text-white px-6 py-3 rounded-lg hover:bg-luxe-dark transition duration-300"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Shipping Address */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={address.street}
                    onChange={(e) =>
                      handleInputChange("street", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-luxe"
                    placeholder="Enter your street address"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-luxe"
                      placeholder="City"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      value={address.state}
                      onChange={(e) =>
                        handleInputChange("state", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-luxe"
                      placeholder="State"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      value={address.zipCode}
                      onChange={(e) =>
                        handleInputChange("zipCode", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-luxe"
                      placeholder="ZIP Code"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      value={address.country}
                      onChange={(e) =>
                        handleInputChange("country", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-luxe"
                      placeholder="Country"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={address.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-luxe"
                    placeholder="Phone number"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Order Items</h2>
              <div className="space-y-4">
                {cartList.map((item) => (
                  <div
                    key={`${item._id}-${item.size}-${item.color}`}
                    className="flex items-center gap-4 border-b pb-4"
                  >
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        {item.size} {item.color && `, ${item.color}`}
                      </p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-luxe font-semibold">
                      {currency}
                      {(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>
                    {currency}
                    {subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? "Free" : `${currency}${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>
                    {currency}
                    {tax.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-luxe">
                    {currency}
                    {total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Payment Method</h3>
                <div className="space-y-3">
                  {/* Cash on Delivery Option */}
                  <div
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      paymentMethod === "cod"
                        ? "border-luxe bg-luxe bg-opacity-5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setPaymentMethod("cod")}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          paymentMethod === "cod"
                            ? "bg-luxe border-luxe"
                            : "border-gray-300"
                        }`}
                      ></div>
                      <span className="font-semibold">
                        Cash on Delivery (COD)
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 ml-7">
                      Pay when you receive your order
                    </p>
                  </div>

                  {/* Stripe Payment Option */}
                  <div
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      paymentMethod === "stripe"
                        ? "border-luxe bg-luxe bg-opacity-5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setPaymentMethod("stripe")}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          paymentMethod === "stripe"
                            ? "bg-luxe border-luxe"
                            : "border-gray-300"
                        }`}
                      ></div>
                      <span className="font-semibold">
                        Credit/Debit Card (Stripe)
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 ml-7">
                      Secure payment with Stripe
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={loading || stripeLoading}
                className={`w-full bg-luxe text-white py-4 rounded-lg font-semibold hover:bg-luxe-dark transition duration-300 ${
                  loading || stripeLoading
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {loading || stripeLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {paymentMethod === "stripe"
                      ? "Processing Payment..."
                      : "Placing Order..."}
                  </div>
                ) : (
                  `${
                    paymentMethod === "stripe"
                      ? "Pay with Stripe"
                      : "Place Order"
                  } - ${currency}${total.toFixed(2)}`
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By placing your order, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
