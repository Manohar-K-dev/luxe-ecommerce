// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
//   {
//     name: { type: String, require: true },
//     description: { type: String, require: true },
//     price: { type: Number, require: true },
//     oldPrice: { type: Number, require: true },
//     image: { type: Array, require: true },
//     mainCategory: { type: String, require: true },
//     category: { type: String, require: true },
//     subCategory: { type: String, require: true },
//     colors: { type: Array, require: true },
//     sizes: { type: Array, require: true },
//     bestseller: { type: Boolean },
//     stock: { type: Number },
//     // date: { type: Number, require: true },
//   },
//   { timestamps: true }
// );

// // name
// // description
// // price
// // oldPrice [ calculate discount percentage ]
// // image
// // mainCategory
// // category
// // subCategory
// // sizes
// // colors
// // stock
// // bestseller
// // date

// const productModel =
//   mongoose.models.Product || mongoose.model("Product", productSchema);

// export default productModel;

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
