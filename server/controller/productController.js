import { v2 as cloudinary } from "cloudinary";
// Model
import productModel from "../model/productModel.js";

// Create: Add new Products
const addProduct = async (req, res) => {
  try {
    // Request: data from body
    const {
      name,
      description,
      price,
      oldPrice,
      colors,
      sizes,
      mainCategory,
      category,
      subCategory,
      bestseller,
    } = req.body;

    // Request: images from file [multer]
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      oldPrice: Number(oldPrice),
      image: imagesUrl,
      mainCategory,
      category,
      subCategory,
      colors: JSON.parse(colors),
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
      date: Date.now(),
    };

    console.log(productData);

    const product = new productModel(productData);
    await product.save();

    res.status(200).json({});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update: List all Products
const listProducts = async (req, res) => {};

// Remove:  Products
const removeProduct = async (req, res) => {};

// View: single Product
const singleProduct = async (req, res) => {};

export { addProduct, listProducts, removeProduct, singleProduct };
