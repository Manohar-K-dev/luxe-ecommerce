import userModel from "../model/userModel.js";

// Add: Products to user Cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = userData.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    return res.status(200).json({ success: true, message: "Added to cart" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update: user Cart - FIXED VERSION
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    // Validate required fields
    if (!userId || !itemId || !size || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: userId, itemId, size, quantity",
      });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let cartData = userData.cartData || {};

    // Initialize cart structure if it doesn't exist
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    // Update quantity - if quantity is 0, remove the item
    if (quantity === 0) {
      delete cartData[itemId][size];
      // If no sizes left for this item, remove the entire item
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
    });
  } catch (error) {
    console.error("Cart update error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while updating cart",
    });
  }
};

// Get: user Cart Data
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData;

    return res.status(200).json({ success: true, cartData });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
