import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = "https://luxe-server-dnlv.onrender.com";

  const [cartItems, setCartItems] = useState({});
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Get auth headers for authenticated requests
  const getAuthHeaders = () => {
    return {
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    };
  };

  // Sync cart with backend when user logs in
  useEffect(() => {
    if (token && user) {
      fetchUserCart();
    }
  }, [token, user]);

  // Fetch user cart from backend
  const fetchUserCart = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        { userId: user?._id },
        getAuthHeaders()
      );

      if (response.data.success) {
        console.log("Fetched cart from backend:", response.data.cartData);
        // Convert backend cart format to frontend format
        const backendCart = response.data.cartData || {};
        const frontendCart = {};

        for (const [itemId, sizes] of Object.entries(backendCart)) {
          frontendCart[itemId] = {};
          for (const [sizeColor, quantity] of Object.entries(sizes)) {
            // Only include items with quantity > 0
            if (quantity > 0) {
              // Split size_color back to separate size and color
              const [size, color] = sizeColor.includes("_")
                ? sizeColor.split("_")
                : [sizeColor, "default"];

              if (!frontendCart[itemId][size]) {
                frontendCart[itemId][size] = {};
              }
              frontendCart[itemId][size][color] = quantity;
            }
          }
          // Clean up empty items
          if (Object.keys(frontendCart[itemId]).length === 0) {
            delete frontendCart[itemId];
          }
        }

        console.log("Converted frontend cart:", frontendCart);
        setCartItems(frontendCart);
      }
    } catch (error) {
      console.error("Error fetching user cart:", error);
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await axios.post(`${backendUrl}/api/user/login`, {
        email,
        password,
      });

      if (response.data.success) {
        const { token, user } = response.data;
        setToken(token);
        setUser(user);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        toast.success(`Welcome ${user.name} from LUXE`);

        // Fetch user cart after login
        await fetchUserCart();

        navigate("/my-account");
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Signup function
  const signup = async (name, email, password) => {
    try {
      setLoading(true);
      const response = await axios.post(`${backendUrl}/api/user/register`, {
        name,
        email,
        password,
        confirmPassword: password,
      });

      if (response.data.success) {
        toast.success("OTP sent to your email! Please verify.");
        return {
          success: true,
          token: response.data.token,
        };
      } else {
        toast.error(response.data.message || "Signup failed");
        return { success: false };
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // OTP Verification function
  const verifyOtp = async (otp, token) => {
    try {
      setLoading(true);
      const response = await axios.post(`${backendUrl}/api/user/otpVerify`, {
        otp,
        token,
      });

      if (response.data.success) {
        toast.success("Registration successful! Please login.");
        return true;
      } else {
        toast.error(response.data.message || "OTP verification failed");
        return false;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setToken("");
    setUser(null);
    setCartItems({});
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/");
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!token;
  };

  // ----------------- CART FUNCTIONS -----------------

  // Add to cart - with backend sync
  const addToCart = async (
    itemId,
    size = "default",
    color = "default",
    quantity = 1
  ) => {
    console.log("Adding to cart:", { itemId, size, color, quantity });

    // Update local state immediately for better UX
    setCartItems((prev) => {
      const cartData = structuredClone(prev);
      if (!cartData[itemId]) cartData[itemId] = {};
      if (!cartData[itemId][size]) cartData[itemId][size] = {};
      cartData[itemId][size][color] =
        (cartData[itemId][size][color] || 0) + quantity;
      return cartData;
    });

    // Sync with backend if user is authenticated
    if (token && user) {
      try {
        // Combine size and color for backend (as per your backend expectation)
        const backendSize = `${size}_${color}`;
        const currentQuantity = cartItems[itemId]?.[size]?.[color] || 0;
        const newQuantity = currentQuantity + quantity;

        console.log("Sending to backend:", {
          userId: user._id,
          itemId,
          size: backendSize,
          quantity: newQuantity,
        });

        const response = await axios.post(
          `${backendUrl}/api/cart/add`,
          {
            userId: user._id,
            itemId,
            size: backendSize,
          },
          getAuthHeaders()
        );

        if (response.data.success) {
          console.log("Successfully added to backend cart");
        } else {
          throw new Error(response.data.message || "Failed to add to cart");
        }
      } catch (error) {
        console.error(
          "Error adding to cart:",
          error.response?.data || error.message
        );
        // Revert local state if backend fails
        setCartItems((prev) => {
          const cartData = structuredClone(prev);
          if (cartData[itemId]?.[size]?.[color]) {
            cartData[itemId][size][color] -= quantity;
            if (cartData[itemId][size][color] <= 0) {
              delete cartData[itemId][size][color];
            }
          }
          return cartData;
        });
        toast.error(
          error.response?.data?.message || "Failed to add item to cart"
        );
      }
    } else {
      // If user is not logged in, just show success message
      toast.success("Added to cart!", { position: "bottom-right" });
    }
  };

  // Remove from cart - with backend sync
  const removeFromCart = async (
    itemId,
    size = "default",
    color = "default",
    quantity = 1
  ) => {
    const currentQuantity = cartItems[itemId]?.[size]?.[color] || 0;
    const newQuantity = Math.max(0, currentQuantity - quantity);

    console.log("Removing from cart:", {
      itemId,
      size,
      color,
      quantity,
      currentQuantity,
      newQuantity,
    });

    // Update local state immediately for better UX
    setCartItems((prev) => {
      const cartData = structuredClone(prev);
      if (cartData[itemId]?.[size]?.[color]) {
        if (cartData[itemId][size][color] > quantity) {
          cartData[itemId][size][color] -= quantity;
        } else {
          delete cartData[itemId][size][color];
        }
        if (Object.keys(cartData[itemId][size]).length === 0)
          delete cartData[itemId][size];
        if (Object.keys(cartData[itemId]).length === 0) delete cartData[itemId];
      }
      return cartData;
    });

    // Sync with backend if user is authenticated
    if (token && user) {
      try {
        const backendSize = `${size}_${color}`;

        if (newQuantity > 0) {
          // Update quantity in backend
          console.log("Updating backend quantity:", {
            itemId,
            size: backendSize,
            quantity: newQuantity,
          });
          await axios.post(
            `${backendUrl}/api/cart/update`,
            {
              userId: user._id,
              itemId,
              size: backendSize,
              quantity: newQuantity,
            },
            getAuthHeaders()
          );
        } else {
          // Item removed completely - set quantity to 0
          console.log("Removing from backend:", { itemId, size: backendSize });
          await axios.post(
            `${backendUrl}/api/cart/update`,
            {
              userId: user._id,
              itemId,
              size: backendSize,
              quantity: 0,
            },
            getAuthHeaders()
          );
        }
      } catch (error) {
        console.error(
          "Error removing from cart:",
          error.response?.data || error.message
        );
        // Revert local state if backend fails
        setCartItems((prev) => {
          const cartData = structuredClone(prev);
          if (!cartData[itemId]) cartData[itemId] = {};
          if (!cartData[itemId][size]) cartData[itemId][size] = {};
          cartData[itemId][size][color] = currentQuantity;
          return cartData;
        });
        toast.error("Failed to update cart on server");
      }
    }
  };

  // Remove item completely from cart - with backend sync
  const removeItemFromCart = async (
    itemId,
    size = "default",
    color = "default"
  ) => {
    console.log("Completely removing item:", { itemId, size, color });

    // Update local state immediately for better UX
    setCartItems((prev) => {
      const cartData = structuredClone(prev);
      if (cartData[itemId]?.[size]?.[color]) {
        delete cartData[itemId][size][color];

        // Clean up empty objects
        if (Object.keys(cartData[itemId][size]).length === 0) {
          delete cartData[itemId][size];
        }
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }
      return cartData;
    });

    // Sync with backend if user is authenticated
    if (token && user) {
      try {
        const backendSize = `${size}_${color}`;

        // Call update with quantity 0 to remove from backend
        console.log("Removing from backend:", { itemId, size: backendSize });
        await axios.post(
          `${backendUrl}/api/cart/update`,
          {
            userId: user._id,
            itemId,
            size: backendSize,
            quantity: 0, // Set to 0 to remove from backend
          },
          getAuthHeaders()
        );
      } catch (error) {
        console.error(
          "Error removing item from cart:",
          error.response?.data || error.message
        );
        toast.error("Failed to remove item from cart");
      }
    }
  };

  // Update cart item quantity - with backend sync
  const updateCartQuantity = async (
    itemId,
    size = "default",
    color = "default",
    quantity = 1
  ) => {
    console.log("Updating cart quantity:", { itemId, size, color, quantity });

    // Update local state immediately for better UX
    setCartItems((prev) => {
      const cartData = structuredClone(prev);
      if (!cartData[itemId]) cartData[itemId] = {};
      if (!cartData[itemId][size]) cartData[itemId][size] = {};

      if (quantity > 0) {
        cartData[itemId][size][color] = quantity;
      } else {
        delete cartData[itemId][size][color];
        if (Object.keys(cartData[itemId][size]).length === 0)
          delete cartData[itemId][size];
        if (Object.keys(cartData[itemId]).length === 0) delete cartData[itemId];
      }
      return cartData;
    });

    // Sync with backend if user is authenticated
    if (token && user) {
      try {
        const backendSize = `${size}_${color}`;

        console.log("Updating backend:", {
          itemId,
          size: backendSize,
          quantity,
        });
        await axios.post(
          `${backendUrl}/api/cart/update`,
          {
            userId: user._id,
            itemId,
            size: backendSize,
            quantity: quantity,
          },
          getAuthHeaders()
        );
      } catch (error) {
        console.error(
          "Error updating cart:",
          error.response?.data || error.message
        );
        toast.error("Failed to update cart on server");
      }
    }
  };

  // Total quantity for Navbar badge
  const totalQuantity = Object.values(cartItems).reduce((sum, sizeObj) => {
    return (
      sum +
      Object.values(sizeObj).reduce(
        (s, colorObj) =>
          s + Object.values(colorObj).reduce((q, val) => q + val, 0),
        0
      )
    );
  }, 0);

  // Get cart item quantity for a specific product
  const getCartItemCount = (itemId, size = "default", color = "default") => {
    return cartItems[itemId]?.[size]?.[color] || 0;
  };

  // // ----------------- ORDERS -----------------
  const addOrder = (order) => {
    setOrders((prev) => [...prev, order]);
    setCartItems({});
  };

  // const placeOrder = (cartList, total, currency) => {
  //   const newOrder = {
  //     orderNumber: Math.floor(Math.random() * 100000),
  //     orderDate: new Date().toLocaleDateString(),
  //     status: "Processing",
  //     products: cartList,
  //     totalPrice: `${currency}${total}`,
  //   };
  //   setOrders((prev) => [...prev, newOrder]);
  //   setCartItems({});
  // };

  // ----------------- ORDERS -----------------

  // Place order function
  const placeOrder = async (orderData) => {
    try {
      setLoading(true);

      const response = await axios.post(
        `${backendUrl}/api/order/place`,
        {
          userId: user._id,
          items: orderData.items,
          amount: orderData.amount,
          address: orderData.address,
        },
        getAuthHeaders()
      );

      if (response.data.success) {
        // Clear cart after successful order
        setCartItems({});

        // Add to local orders state
        const newOrder = {
          orderNumber: Math.floor(Math.random() * 100000),
          orderDate: new Date().toLocaleDateString(),
          status: "Order Placed",
          products: orderData.items,
          totalPrice: `${currency}${orderData.amount}`,
          address: orderData.address,
          paymentMethod: "COD",
          payment: false,
        };

        setOrders((prev) => [...prev, newOrder]);
        toast.success("Order placed successfully!");
        return { success: true, order: newOrder };
      } else {
        throw new Error(response.data.message || "Failed to place order");
      }
    } catch (error) {
      console.error(
        "Error placing order:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || "Failed to place order");
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Get user orders
  const getUserOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/api/order/userOrders`,
        { userId: user._id },
        getAuthHeaders()
      );

      if (response.data.success) {
        setOrders(response.data.orders || []);
        return response.data.orders;
      }
    } catch (error) {
      console.error(
        "Error fetching user orders:",
        error.response?.data || error.message
      );
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  // Update the existing placeOrder function to use the new one
  const placeOrderLocal = (cartList, total, currency, address = {}) => {
    const orderData = {
      items: cartList,
      amount: total,
      address: address,
    };

    return placeOrder(orderData);
  };

  // ----------------- PRODUCTS -----------------
  const getProductsData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  const value = {
    // Products
    products,
    getProductsData,

    // Currency & Delivery
    currency,
    delivery_fee,

    // Cart
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    removeItemFromCart,
    updateCartQuantity,
    totalQuantity,
    getCartItemCount,

    // Orders
    orders,
    setOrders,
    // placeOrder,
    placeOrder: placeOrderLocal,
    placeOrderBackend: placeOrder,
    addOrder,
    getUserOrders,

    // Authentication
    token,
    setToken,
    user,
    login,
    signup,
    verifyOtp,
    logout,
    isAuthenticated,

    // Navigation & Backend
    navigate,
    backendUrl,
    loading,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
