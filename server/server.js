// import dotenv from "dotenv";
// dotenv.config();
// import express from "express";
// import cors from "cors";
// // Config
// import connectDB from "./config/mongodb.js";
// import connectCloudinary from "./config/cloudinary.js";
// // Routes
// import userRouter from "./routes/userRoute.js";
// import productRouter from "./routes/productRoute.js";
// import cartRouter from "./routes/cartRoute.js";
// import orderRouter from "./routes/orderRoute.js";

// // App Config
// const app = express();
// const port = process.env.PORT;
// connectDB();
// connectCloudinary();

// // Middlewares
// app.use(express.json());
// app.use(cors()); // [ connect ( Frontend - Backend ) ]

// // api endpoints
// app.use("/api/user", userRouter);
// app.use("/api/product", productRouter);
// app.use("/api/cart", cartRouter);
// app.use("/api/order", orderRouter);

// app.get("/", (req, res) => {
//   res.send("API Working");
// });

// // start Express server
// app.listen(port, () => console.log(`Server is Running in port: ${port}`));

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

// Config
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

// Routes
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// App Config
const app = express();
const port = process.env.PORT;

connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

// Start Express server
app.listen(port, () => console.log(`Server running on port: ${port}`));
