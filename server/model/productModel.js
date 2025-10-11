import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number, required: true },
    image: { type: Array, required: true },
    mainCategory: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    colors: { type: Array, required: true },
    sizes: { type: Array, required: true },
    bestseller: { type: Boolean },
    stock: { type: Number },
  },
  { timestamps: true }
);

const productModel =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default productModel;
