import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
// Routes
import userRoutes from "./routes/user.js";

const app = express();

// port
dotenv.config();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors())

// Routes
app.use("/api/", userRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

//
app.listen(port, () => {
  console.log(`Server is Running in port: ${port}`);
  connectDB();
});
