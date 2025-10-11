import Stripe from "stripe";
import dotenv from "dotenv";
import orderModel from "../model/orderModel.js";
import userModel from "../model/userModel.js";

dotenv.config({ path: "./.env" });

// Global variables
const currency = "inr";
const deliveryCharge = 10;

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.error("❌ STRIPE_SECRET_KEY not found in .env file");
}

// Gateway initialize
const stripe = new Stripe(stripeSecretKey);
// // Initialize Stripe only if API key exists

// Placing Orders using COD Method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    return res.status(200).json({ success: true, message: "Order Placed" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Placing Orders using Stripe Method
export const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    // Validate Stripe key
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({
        success: false,
        message: "STRIPE_SECRET_KEY not found in environment variables",
      });
    }

    // Create line items for Stripe
    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
          images: item.image ? [item.image[0]] : [],
        },
        unit_amount: Math.round(Number(item.price) * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `http://localhost:5173/all-Products`,
      cancel_url: `http://localhost:5173/all-Products`,
    });

    if (!session || !session.url) {
      throw new Error("Failed to create Stripe session");
    }

    res.status(200).json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// chatgpt code
export const verifyStripePayment = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment failed, order removed" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Placing Orders using Razorpay Method
const placeOrderRazorpay = async (req, res) => {};

// All Orders Data for Admin Panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("userId", "name email") // Populate user details
      .sort({ date: -1 }); // Sort by latest first

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error in allOrders:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// User Orders Data for Frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body; // FIXED: Changed from res.body to req.body

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const orders = await orderModel.find({ userId }).sort({ date: -1 });

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error in userOrders:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Order Status from Admin Panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({
        success: false,
        message: "Order ID and status are required",
      });
    }

    // Validate status
    const validStatuses = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
      "Order Placed",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status: status },
      { new: true } // Return updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error in updateStatus:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  placeOrder,
  // placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
