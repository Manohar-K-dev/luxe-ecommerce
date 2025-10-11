import { v2 as cloudinary } from "cloudinary";
import productModel from "../model/productModel.js";

// Create: Add new Products
const addProduct = async (req, res) => {
  try {
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
      stock,
    } = req.body;

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
      bestseller: bestseller === "true",
      stock,
    };

    const product = new productModel(productData);
    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get: List all Products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete: Remove Product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);

    return res.status(200).json({
      success: true,
      message: "Product removed successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get: Single Product
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await productModel.findById(productId);

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };
