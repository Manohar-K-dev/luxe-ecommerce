// admin/src/services/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("adminToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email, password) => {
    const response = await api.post("/user/admin", { email, password });
    return response.data;
  },
};

// Products API
export const productsAPI = {
  // Get all products
  listProducts: async () => {
    const response = await api.get("/product/list");
    return response.data;
  },

  // Add new product
  addProduct: async (productData) => {
    const formData = new FormData();

    // Append basic fields
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("oldPrice", productData.oldPrice || productData.price);
    formData.append("mainCategory", productData.mainCategory);
    formData.append(
      "category",
      productData.category || productData.mainCategory
    );
    formData.append("subCategory", productData.subCategory || "General");
    formData.append("colors", JSON.stringify(productData.colors || []));
    formData.append("sizes", JSON.stringify(productData.sizes || []));
    formData.append("bestseller", productData.bestseller ? "true" : "false");
    formData.append("stock", productData.stock);

    // Append images
    productData.images.forEach((image, index) => {
      if (image instanceof File) {
        formData.append(`image${index + 1}`, image);
      }
    });

    const response = await api.post("/product/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Delete product
  removeProduct: async (productId) => {
    const response = await api.post("/product/remove", { id: productId });
    return response.data;
  },

  // Get single product
  getProduct: async (productId) => {
    const response = await api.post("/product/single", { productId });
    return response.data;
  },
};

// Orders API
export const ordersAPI = {
  // Get all orders
  listOrders: async () => {
    // Since your backend doesn't have orders API yet, return mock data
    return {
      success: true,
      orders: [
        {
          id: "LX-2024-089",
          customer: "Sarah Johnson",
          email: "sarahj@email.com",
          amount: "$547",
          status: "Completed",
          date: "Jan 30, 2024",
          products: [],
        },
        {
          id: "LX-2024-088",
          customer: "Michael Chen",
          email: "michael.c@email.com",
          amount: "$299",
          status: "Processing",
          date: "Jan 30, 2024",
          products: [],
        },
      ],
    };
  },
};

// Users API
export const usersAPI = {
  // Get all users
  listUsers: async () => {
    // Since your backend doesn't have users API yet, return mock data
    return {
      success: true,
      users: [
        {
          id: 1,
          name: "Sarah Johnson",
          email: "sarahj@email.com",
          orders: 12,
          totalSpent: "$2,847",
          status: "Active",
          joined: "Jan 15, 2023",
        },
        {
          id: 2,
          name: "Michael Chen",
          email: "michael.c@email.com",
          orders: 8,
          totalSpent: "$1,299",
          status: "Active",
          joined: "Mar 22, 2023",
        },
      ],
    };
  },
};

export default api;
