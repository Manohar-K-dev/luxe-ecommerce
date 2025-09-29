import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    oldPrice: { type: Number, require: true },
    image: { type: Array, require: true },
    mainCategory: { type: String, require: true },
    category: { type: String, require: true },
    subCategory: { type: String, require: true },
    colors: { type: Array, require: true },
    sizes: { type: Array, require: true },
    bestseller: { type: Boolean },
    date: { type: Number, require: true },
    // stock: { type: Number },
  },
  { timestamps: true }
);

// name
// description
// price
// oldPrice [ calculate discount percentage ]
// image
// mainCategory
// category
// subCategory
// sizes
// colors
// stock
// bestseller
// date

const productModel =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default productModel;
