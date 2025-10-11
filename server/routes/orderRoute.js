// import express from "express";
// import {
//   allOrders,
//   placeOrder,
//   placeOrderRazorpay,
//   placeOrderStripe,
//   updateStatus,
//   userOrders,
//   verifyStripePayment,
// } from "../controller/orderController.js";
// import adminAuth from "../middleware/adminAuth.js";
// import { isAuth } from "../middleware/isAuth.js";

// const orderRouter = express.Router();

// // Post: Admin Features
// orderRouter.post("/list", adminAuth, allOrders);
// orderRouter.post("/status", adminAuth, updateStatus);

// // Post: Payment Features
// orderRouter.post("/place", isAuth, placeOrder);
// orderRouter.post("/stripe", isAuth, placeOrderStripe);
// orderRouter.post("/razorpay", isAuth, placeOrderRazorpay);
// // chatgpt
// orderRouter.post("/verifyStripe", verifyStripePayment);

// // Post: User Feature
// orderRouter.post("/userorders", isAuth, userOrders);

// export default orderRouter;

import express from "express";
import {
  allOrders,
  placeOrder,
  placeOrderStripe,
  updateStatus,
  userOrders,
  verifyStripePayment,
} from "../controller/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import { isAuth } from "../middleware/isAuth.js";

const orderRouter = express.Router();

// Admin Features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// Payment Features
orderRouter.post("/place", isAuth, placeOrder);
orderRouter.post("/stripe", isAuth, placeOrderStripe);

// User Feature
orderRouter.post("/userorders", isAuth, userOrders);
orderRouter.post("/verifyStripe", isAuth, verifyStripePayment);

export default orderRouter;
