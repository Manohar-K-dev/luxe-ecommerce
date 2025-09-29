import express from "express";

// Controller
import {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
} from "../controller/productController.js";

// Middleware
import upload from "../middleware/multer.js";

const productRouter = express.Router();

// POST:
productRouter.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

// DELETE:
productRouter.post("/remove", removeProduct);

// GET:
productRouter.post("/single", singleProduct);
productRouter.post("/list", listProducts);

export default productRouter;
