// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//   userId: { type: String, require: true },
//   items: { type: Array, require: true },
//   amount: { type: Number, require: true },
//   address: { type: Object, require: true },
//   status: { type: String, require: true, default: "Order Placed" },
//   paymentMethod: { type: String, require: true },
//   payment: { type: Boolean, require: true, default: false },
//   date: { type: Number, require: true },
// });

// const orderModel =
//   mongoose.models.order || mongoose.model("order", orderSchema);

// export default orderModel;

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, required: true, default: "Order Placed" },
  paymentMethod: { type: String, required: true },
  payment: { type: Boolean, required: true, default: false },
  date: { type: Number, required: true },
});

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
