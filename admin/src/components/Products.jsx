import React, { useState, useEffect, useRef } from "react";
import {
  LuPlus,
  LuX,
  LuImage,
  LuEllipsisVertical,
  LuTrash2,
  LuEye,
  LuHammer,
} from "react-icons/lu";
import { productsAPI } from "../services/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    oldPrice: "",
    colors: [],
    images: [],
    mainCategory: "",
    category: "",
    subCategory: "",
    sizes: [],
    bestseller: false,
    stock: "",
  });
  const [tempColor, setTempColor] = useState("");
  const [tempSize, setTempSize] = useState("");
  const fileInputRef = useRef(null);

  // Load products on component mount
  useEffect(() => {
    loadProducts();
  }, []);

  // admin/src/components/Products.jsx - Update the loadProducts function
  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const response = await productsAPI.listProducts();
      if (response.success) {
        // Transform the data to match your frontend structure
        const transformedProducts = response.products.map((product) => ({
          ...product,
          // Ensure all required fields are present
          stock: product.stock || 0,
          status: product.stock > 0 ? "Active" : "Out of Stock",
          images: product.image || [], // Map 'image' to 'images'
        }));
        setProducts(transformedProducts);
      } else {
        throw new Error(response.message || "Failed to load products");
      }
    } catch (error) {
      console.error("Error loading products:", error);
      alert("Failed to load products");
      // Fallback to mock data if API fails
      setProducts([
        {
          _id: "1",
          name: "Premium Silk Blouse",
          description: "Luxurious silk blouse with elegant design",
          price: 129,
          oldPrice: 159,
          image: ["/api/placeholder/300/400"],
          mainCategory: "Women",
          category: "Clothing",
          subCategory: "Blouses",
          colors: ["black", "white", "red"],
          sizes: ["S", "M", "L", "XL"],
          bestseller: true,
          stock: 15,
          status: "Active",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (stock) => {
    if (stock === 0) {
      return "bg-red-100 text-red-800";
    } else if (stock < 10) {
      return "bg-orange-100 text-orange-800";
    } else {
      return "bg-green-100 text-green-800";
    }
  };

  const getStatusText = (stock) => {
    if (stock === 0) {
      return "Out of Stock";
    } else if (stock < 10) {
      return "Low Stock";
    } else {
      return "In Stock";
    }
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);

    if (newProduct.images.length + files.length > 4) {
      alert("Maximum 4 images allowed");
      return;
    }

    setNewProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const handleRemoveImage = (indexToRemove) => {
    setNewProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleAddColor = () => {
    if (tempColor && !newProduct.colors.includes(tempColor)) {
      setNewProduct((prev) => ({
        ...prev,
        colors: [...prev.colors, tempColor],
      }));
      setTempColor("");
    }
  };

  const handleRemoveColor = (colorToRemove) => {
    setNewProduct((prev) => ({
      ...prev,
      colors: prev.colors.filter((color) => color !== colorToRemove),
    }));
  };

  const handleAddSize = () => {
    if (tempSize && !newProduct.sizes.includes(tempSize)) {
      setNewProduct((prev) => ({
        ...prev,
        sizes: [...prev.sizes, tempSize],
      }));
      setTempSize("");
    }
  };

  const handleRemoveSize = (sizeToRemove) => {
    setNewProduct((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((size) => size !== sizeToRemove),
    }));
  };

  const handleAddProduct = async () => {
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.mainCategory ||
      newProduct.images.length === 0
    ) {
      alert("Please fill in all required fields and add at least one image");
      return;
    }

    try {
      setIsLoading(true);
      const response = await productsAPI.addProduct(newProduct);

      if (response.success) {
        alert("Product added successfully!");
        setShowAddProduct(false);
        setNewProduct({
          name: "",
          description: "",
          price: "",
          oldPrice: "",
          colors: [],
          images: [],
          mainCategory: "",
          category: "",
          subCategory: "",
          sizes: [],
          bestseller: false,
          stock: "",
        });
        loadProducts(); // Reload products list
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert(error.response?.data?.message || "Failed to add product");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await productsAPI.removeProduct(productId);
        if (response.success) {
          alert("Product deleted successfully!");
          setProducts((prev) =>
            prev.filter((product) => product._id !== productId)
          );
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product");
      }
      setActiveDropdown(null);
    }
  };

  const handleViewInStore = (productId) => {
    const product = products.find((p) => p._id === productId);
    alert(
      `Viewing "${product.name}" in store\nThis would redirect to the product page in a real application.`
    );
    setActiveDropdown(null);
  };

  const toggleDropdown = (productId) => {
    setActiveDropdown(activeDropdown === productId ? null : productId);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const categories = {
    Men: ["Clothes", "Shoes", "Accessories"],
    Women: ["Clothes", "Shoes", "Accessories"],
    Kids: ["Clothes", "Shoes", "Accessories"],
  };

  const subCategories = {
    Clothes: ["Topwear", "Bottomwear", "Innerwear"],
    Shoes: ["Casual", "Sports", "Formal"],
    Accessories: ["Jewelry", "Bags", "Watches"],
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        <button
          onClick={() => setShowAddProduct(true)}
          className="flex items-center gap-2 bg-luxe text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors duration-200"
        >
          <LuPlus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-luxe"></div>
        </div>
      )}

      {/* Product List Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        {/* Section Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Product List</h2>
          <p className="text-sm text-gray-600 mt-1">
            {products.length} products found
          </p>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                  Product
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                  Images
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                  Category
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                  Price
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                  Status
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                >
                  {/* Product Name */}
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {product.description?.substring(0, 50)}...
                      </p>
                    </div>
                  </td>

                  {/* Product Images */}
                  <td className="py-4 px-6">
                    <div className="flex gap-1">
                      {product.image?.slice(0, 3).map((img, index) => (
                        <div key={index} className="relative">
                          <img
                            src={img}
                            alt={`${product.name} ${index + 1}`}
                            className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                          />
                          {index === 2 && product.image.length > 3 && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                              <span className="text-white text-xs font-medium">
                                +{product.image.length - 3}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                      {(!product.image || product.image.length === 0) && (
                        <div className="w-10 h-10 rounded-lg border border-dashed border-gray-300 flex items-center justify-center">
                          <LuImage className="w-4 h-4 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-600">
                      {product.mainCategory}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="py-4 px-6">
                    <div>
                      <span className="text-sm font-medium text-gray-800">
                        ${product.price}
                      </span>
                      {product.oldPrice > 0 && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ${product.oldPrice}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        product.stock || 0
                      )}`}
                    >
                      {getStatusText(product.stock || 0)}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6">
                    <div className="relative dropdown-container">
                      <button
                        onClick={() => toggleDropdown(product._id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                      >
                        <LuEllipsisVertical className="w-5 h-5 text-gray-400" />
                      </button>

                      {/* Dropdown Menu */}
                      {activeDropdown === product._id && (
                        <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                          <button
                            onClick={() => handleViewInStore(product._id)}
                            className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                          >
                            <LuEye className="w-4 h-4 text-gray-400" />
                            View in Store
                          </button>

                          <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                            <LuHammer className="w-4 h-4 text-gray-400" />
                            Edit Product
                          </button>

                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                          >
                            <LuTrash2 className="w-4 h-4" />
                            Delete Product
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">
                Add New Product
              </h2>
              <button
                onClick={() => setShowAddProduct(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <LuX className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Images * (1-4 images)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    multiple
                    accept="image/*"
                    className="hidden"
                  />
                  <LuImage className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-2">
                    Drag & drop images here or click to browse
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-luxe text-white rounded-lg hover:bg-blue-800 transition-colors duration-200 text-sm"
                  >
                    Browse Files
                  </button>
                  <p className="text-xs text-gray-500 mt-2">
                    Maximum 4 images • JPG, PNG, GIF supported
                  </p>
                </div>

                {/* Preview Uploaded Images */}
                {newProduct.images.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-700 mb-2">
                      Selected Images ({newProduct.images.length}/4)
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {newProduct.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border border-gray-200"
                          />
                          <button
                            onClick={() => handleRemoveImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          >
                            <LuX className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxe focus:border-transparent"
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxe focus:border-transparent"
                    placeholder="Enter price"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Old Price ($)
                  </label>
                  <input
                    type="number"
                    value={newProduct.oldPrice}
                    onChange={(e) =>
                      setNewProduct((prev) => ({
                        ...prev,
                        oldPrice: e.target.value,
                      }))
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxe focus:border-transparent"
                    placeholder="Enter old price"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) =>
                      setNewProduct((prev) => ({
                        ...prev,
                        stock: e.target.value,
                      }))
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxe focus:border-transparent"
                    placeholder="Enter stock quantity"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxe focus:border-transparent resize-none"
                  placeholder="Enter product description"
                />
              </div>

              {/* Categories */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Main Category *
                  </label>
                  <select
                    value={newProduct.mainCategory}
                    onChange={(e) =>
                      setNewProduct((prev) => ({
                        ...prev,
                        mainCategory: e.target.value,
                        category: "",
                        subCategory: "",
                      }))
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxe focus:border-transparent"
                  >
                    <option value="">Select Main Category</option>
                    {Object.keys(categories).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct((prev) => ({
                        ...prev,
                        category: e.target.value,
                        subCategory: "",
                      }))
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxe focus:border-transparent"
                    disabled={!newProduct.mainCategory}
                  >
                    <option value="">Select Category</option>
                    {newProduct.mainCategory &&
                      categories[newProduct.mainCategory]?.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sub Category
                  </label>
                  <select
                    value={newProduct.subCategory}
                    onChange={(e) =>
                      setNewProduct((prev) => ({
                        ...prev,
                        subCategory: e.target.value,
                      }))
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxe focus:border-transparent"
                    disabled={!newProduct.category}
                  >
                    <option value="">Select Sub Category</option>
                    {newProduct.category &&
                      subCategories[newProduct.category]?.map((subCat) => (
                        <option key={subCat} value={subCat}>
                          {subCat}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Colors */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Colors
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tempColor}
                    onChange={(e) => setTempColor(e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxe focus:border-transparent"
                    placeholder="Add color"
                  />
                  <button
                    onClick={handleAddColor}
                    className="px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {newProduct.colors.map((color, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {color}
                      <button
                        onClick={() => handleRemoveColor(color)}
                        className="hover:text-blue-600"
                      >
                        <LuX className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sizes
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tempSize}
                    onChange={(e) => setTempSize(e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxe focus:border-transparent"
                    placeholder="Add size (e.g., M, L, XL)"
                  />
                  <button
                    onClick={handleAddSize}
                    className="px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {newProduct.sizes.map((size, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                    >
                      {size}
                      <button
                        onClick={() => handleRemoveSize(size)}
                        className="hover:text-green-600"
                      >
                        <LuX className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Bestseller */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={newProduct.bestseller}
                  onChange={(e) =>
                    setNewProduct((prev) => ({
                      ...prev,
                      bestseller: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 text-luxe focus:ring-luxe border-gray-300 rounded"
                />
                <label className="text-sm font-medium text-gray-700">
                  Mark as Bestseller
                </label>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-4 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowAddProduct(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProduct}
                disabled={isLoading}
                className={`px-6 py-3 rounded-lg transition-colors duration-200 font-medium ${
                  isLoading
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-luxe text-white hover:bg-blue-800"
                }`}
              >
                {isLoading ? "Adding Product..." : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Total Products
          </h3>
          <p className="text-3xl font-bold text-luxe">{products.length}</p>
          <p className="text-sm text-gray-600 mt-2">Active in inventory</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Low Stock
          </h3>
          <p className="text-3xl font-bold text-orange-600">
            {
              products.filter((p) => (p.stock || 0) > 0 && (p.stock || 0) < 10)
                .length
            }
          </p>
          <p className="text-sm text-gray-600 mt-2">Products need restocking</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Out of Stock
          </h3>
          <p className="text-3xl font-bold text-red-600">
            {products.filter((p) => (p.stock || 0) === 0).length}
          </p>
          <p className="text-sm text-gray-600 mt-2">Currently unavailable</p>
        </div>
      </div>
    </div>
  );
};

export default Products;
