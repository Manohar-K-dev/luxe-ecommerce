import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// Config
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
// Routes
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";

// App Config
const app = express();
dotenv.config();
const port = process.env.PORT;
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors()); // [ connect ( Frontend - Backend ) ]

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

// start Express server
app.listen(port, () => console.log(`Server is Running in port: ${port}`));
