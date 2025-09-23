import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Context
import { ShopContext } from "../context/CreateContext.js";
// Assets
import { addresses } from "../assets/assets.js";

const PlaceOrder = () => {
  const { cartItems, products, currency, delivery_fee, addOrder } =
    useContext(ShopContext);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "Jessica.parker@email.com",
    phone: "+1 (555) 123-4567",
    address: "",
    city: "",
    zip: "",
    country: "",
    paymentMethod: "card",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  // Build cart list
  let cartList = [];
  let subtotal = 0;
  for (let itemId in cartItems) {
    for (let size in cartItems[itemId]) {
      for (let color in cartItems[itemId][size]) {
        let quantity = cartItems[itemId][size][color];
        let product = products.find((p) => p._id === itemId);
        if (product) {
          cartList.push({ ...product, size, color, quantity });
          subtotal += product.price * quantity;
        }
      }
    }
  }

  // Shipping & Tax
  let shipping =
    subtotal >= 2000 ? delivery_fee + 20 : subtotal >= 100 ? delivery_fee : 0;
  let tax = Math.round(subtotal * 0.1);
  let total = subtotal + shipping + tax;

  // Auto-select default address on page load
  useEffect(() => {
    const defaultAddr = addresses.find((addr) => addr.default);
    if (defaultAddr) setSelectedAddress(defaultAddr);
  }, []);

  // Auto-fill form from selected address
  useEffect(() => {
    if (selectedAddress) {
      const { name, door, street, city, pin, country } = selectedAddress;
      const [firstName, lastName] = name.split(" ");
      setForm((prev) => ({
        ...prev,
        firstName,
        lastName,
        address: `${door} ${street}`,
        city,
        zip: pin,
        country,
      }));
    }
  }, [selectedAddress]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleNext = () => {
    // Validate required fields before moving to next step
    if (step === 1) {
      const requiredFields = [
        "firstName",
        "lastName",
        "email",
        "phone",
        "address",
        "city",
        "zip",
      ];
      for (let field of requiredFields) {
        if (!form[field]) {
          alert("Please fill all required fields!");
          return;
        }
      }
    }
    if (step === 2 && form.paymentMethod === "card") {
      const cardFields = ["cardNumber", "expiry", "cvv"];
      for (let field of cardFields) {
        if (!form[field]) {
          alert("Please fill all payment fields!");
          return;
        }
      }
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);
  const handleOrder = () => {
    const orderProducts = [];
    let orderTotal = 0;

    for (let itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (!product) continue;

      for (let size in cartItems[itemId]) {
        for (let color in cartItems[itemId][size]) {
          const quantity = cartItems[itemId][size][color];
          orderProducts.push({
            ...product,
            size,
            color,
            quantity,
          });
          orderTotal += product.price * quantity;
        }
      }
    }

    const order = {
      orderNumber: Math.floor(Math.random() * 1000000),
      orderDate: new Date().toLocaleDateString(),
      status: "Processing",
      products: orderProducts,
      subtotal: orderTotal,
      shipping,
      tax,
      totalPrice: orderTotal + shipping + tax,
    };

    addOrder(order);

    // Redirect to Account page
    navigate("/my-account", { state: { activeTab: "orders" } });
  };

  // -----------------------------UI-----------------------------------
  return (
    <div className="flex flex-col lg:flex-row gap-8 px-6 py-8">
      {/* Left Column */}
      <div className="flex-1 shadow p-6 rounded-xl bg-white">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        {/* Step Indicators */}
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div
                className={`rounded-full w-8 h-8 flex items-center justify-center ${
                  step >= s ? "bg-indigo-600 text-white" : "bg-gray-200"
                }`}
              >
                {s}
              </div>
              {s !== 3 && <div className="flex-1 border-t mx-2"></div>}
            </React.Fragment>
          ))}
        </div>

        {/* Step 1 - Shipping */}
        {step === 1 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              {addresses.map((address, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedAddress(address)}
                  className={`border p-4 rounded-xl cursor-pointer ${
                    selectedAddress === address
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-gray-300"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{address.type}</h3>
                    {address.default && (
                      <span className="text-xs text-white bg-indigo-600 px-2 py-1 rounded">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">{`${address.door} ${address.street}, ${address.city}, ${address.pin}, ${address.country}`}</p>
                </div>
              ))}
              <button className="border border-dashed border-gray-400 p-4 rounded-xl text-gray-500 text-center">
                + Add New Address
              </button>
            </div>

            {/* Shipping form inputs */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                required
                className="border rounded-lg px-3 py-2"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                required
                className="border rounded-lg px-3 py-2"
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="border rounded-lg px-3 py-2 w-full mb-4"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="border rounded-lg px-3 py-2 w-full mb-4"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              required
              className="border rounded-lg px-3 py-2 w-full mb-4"
            />
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                required
                className="border rounded-lg px-3 py-2"
              />
              <input
                type="text"
                name="zip"
                placeholder="ZIP Code"
                value={form.zip}
                onChange={handleChange}
                required
                className="border rounded-lg px-3 py-2"
              />
            </div>
            <button
              onClick={handleNext}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg w-full"
            >
              Continue to Payment
            </button>
          </div>
        )}

        {/* Step 2 - Payment */}
        {step === 2 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
            <div className="mb-4 grid gap-3">
              <label className="flex items-center gap-2 border p-3 rounded-lg">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={form.paymentMethod === "card"}
                  onChange={handleChange}
                  required
                />
                Credit/Debit Card
              </label>
              <label className="flex items-center gap-2 border p-3 rounded-lg">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={form.paymentMethod === "paypal"}
                  onChange={handleChange}
                  required
                />
                PayPal
              </label>
            </div>

            {form.paymentMethod === "card" && (
              <div className="grid gap-4 mb-4">
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={form.cardNumber}
                  onChange={handleChange}
                  required
                  className="border rounded-lg px-3 py-2"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    value={form.expiry}
                    onChange={handleChange}
                    required
                    className="border rounded-lg px-3 py-2"
                  />
                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={form.cvv}
                    onChange={handleChange}
                    required
                    className="border rounded-lg px-3 py-2"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <button
                onClick={handleBack}
                className="border px-6 py-3 rounded-lg"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg"
              >
                Review Order
              </button>
            </div>
          </div>
        )}

        {/* Step 3 - Review */}
        {step === 3 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Review & Confirm</h2>
            <div className="mb-4">
              <p>
                <strong>Shipping to:</strong> {form.firstName} {form.lastName},{" "}
                {form.address}, {form.city} {form.zip}
              </p>
              <p>
                <strong>Payment:</strong>{" "}
                {form.paymentMethod === "card" ? "Credit/Debit Card" : "PayPal"}
              </p>
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={handleBack}
                className="border px-6 py-3 rounded-lg"
              >
                Back
              </button>
              <button
                onClick={handleOrder}
                className="bg-green-600 text-white px-6 py-3 rounded-lg"
              >
                Complete Order
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Right Column - Order Summary */}
      <div className="w-full lg:w-1/3 shadow p-6 rounded-xl bg-white">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="flex flex-col gap-4 mb-4">
          {cartList.map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <img
                src={item.image[0]}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-600">
                  Size: {item.size}, {item.color} × {item.quantity}
                </p>
              </div>
              <p>
                {currency}
                {item.price * item.quantity}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>
              {currency}
              {subtotal}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `${currency}${shipping}`}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>
              {currency}
              {tax}
            </span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t mt-4 pt-4">
            <span>Total</span>
            <span>
              {currency}
              {total}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
