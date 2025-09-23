import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
// npm for Notification
import { toast } from "react-toastify";
// Context
import { ShopContext } from "../context/CreateContext.js";
// Icons
import {
  RiStarFill,
  RiStarHalfFill,
  RiAddLine,
  RiSubtractLine,
  RiHeartLine,
} from "react-icons/ri";
import ColorSelector from "../components/ui/ColorSelector.jsx";
import SizeSelector from "../components/ui/SizeSelector.jsx";
import ProductGallery from "../components/ui/ProductGallery.jsx";

const ViewProduct = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [details, setDetails] = useState("Description");
  const [quantity, setQuantity] = useState(1);

  // Find Product
  const item = products.find((p) => p._id === productId);

  const [selectedSize, setSelectedSize] = useState(
    item.sizes ? item.sizes[0] : "default"
  );
  const [selectedColor, setSelectedColor] = useState(
    item.colors ? item.colors[0] : "default"
  );

  if (!item) {
    return (
      <div className="text-center place-content-center font-semibold text-lg h-96">
        Product Not found !!!
      </div>
    );
  }

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart(item._id, selectedSize, selectedColor, quantity);

    toast.success(`${quantity} item(s) added to your cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    setQuantity(1);
  };

  // Reviews
  const reviews = [
    {
      rating: 5,
      name: "Sarah Johnson",
      description:
        "Beautiful blouse! The silk is incredibly soft and the fit is perfect. Highly recommend!",
    },
    {
      rating: 4,
      name: "Emma Wilson",
      description:
        "Great quality and fast shipping. The color is exactly as shown in the photos.",
    },
  ];

  // Find Discount
  const discount = Math.floor(
    ((item.oldPrice - item.price) / item.oldPrice) * 100
  );

  const handleMoreDetails = (e) => {
    setDetails(e.target.textContent);
  };

  return (
    <div className="px-4 py-6 sm:px-8 md:px-12 lg:px-20 md:py-10 grid md:grid-cols-2">
      <div>
        <ProductGallery images={item.image} />
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-xl md:text-3xl font-bold">{item.name}</h1>
        <div className="flex items-center gap-4">
          <p className="text-luxe text-2xl md:text-3xl font-bold">
            {currency}
            {item.price}
          </p>
          {item.oldPrice && (
            <p className="text-gray-600 text-xl md:text-2xl line-through tracking-wide">
              {currency}
              {item.oldPrice}
            </p>
          )}
          {item.oldPrice && (
            <p className="bg-[#FF7F50] text-white text-sm rounded-full py-1 px-3 place-content-center">
              {discount}% OFF
            </p>
          )}
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex gap-[2px] text-lg text-yellow-400">
            {(() => {
              // 1. Calculate average rating
              const avgRating =
                reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

              // 2. Loop through 5 stars
              return Array.from({ length: 5 }).map((_, i) => {
                if (i + 1 <= Math.floor(avgRating)) {
                  return <RiStarFill key={i} />; // full star
                } else if (i < avgRating) {
                  return <RiStarHalfFill key={i} />; // half star
                } else {
                  return <RiStarFill key={i} className="text-gray-300" />; // empty star
                }
              });
            })()}
          </div>
          <p>({reviews.length} reviews)</p>
        </div>
        <p className="text-gray-600">{item.description}</p>
        {item.colors && (
          <ColorSelector
            colors={item.colors}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        )}
        {item.sizes && (
          <SizeSelector
            sizes={item.sizes}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />
        )}
        <div className="flex items-center justify-between gap-4 md:gap-8">
          <div className="flex items-center rounded-lg border border-gray-300">
            <button onClick={decreaseQty} className="px-2 md:px-3 py-4">
              <RiSubtractLine />
            </button>
            <span className="px-3 md:px-4 py-3 border-l border-r">
              {quantity}
            </span>
            <button onClick={increaseQty} className="px-2 md:px-3 py-3">
              <RiAddLine />
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="px-3 py-3 md:py-4 bg-luxe rounded-lg text-white w-full"
          >
            Add to Cart
          </button>
          <button className="px-3 py-3 md:py-4 rounded-lg border text-lg md:text-xl">
            <RiHeartLine />
          </button>
        </div>
        <hr />
        <div className="">
          <div className="flex justify-between md:gap-8 md:justify-start">
            <div>
              <button
                onClick={handleMoreDetails}
                className={`${
                  details === "Description" && "bg-luxe text-white"
                } px-3 py-2 rounded-lg transition`}
              >
                Description
              </button>
            </div>
            <div>
              <button
                onClick={handleMoreDetails}
                className={`${
                  details === "Shipping" && "bg-luxe text-white"
                } px-3 py-2 rounded-lg transition`}
              >
                Shipping
              </button>
            </div>
            <div>
              <button
                onClick={handleMoreDetails}
                className={`${
                  details === "Reviews" && "bg-luxe text-white"
                } px-3 py-2 rounded-lg transition`}
              >
                Reviews
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div>
          {details === "Description" && (
            <div className="space-y-3">
              <span className="font-semibold">Product Details</span>
              <ul className="space-y-1 text-gray-600">
                <li>• 100% Pure Silk</li>
                <li>• Dry Clean Only</li>
                <li>• Made in Italy</li>
                <li>• Classic Fit</li>
                <li>• Button Front Closure</li>
              </ul>
            </div>
          )}
          {details === "Shipping" && (
            <div className="space-y-3">
              <span className="font-semibold">Shipping Information</span>
              <ul className="space-y-1 text-gray-600">
                <li className="mb-4">
                  Free standard shipping on orders over $100. Express shipping
                  available.
                </li>
                <li>• Standard Delivery: 5-7 business days</li>
                <li>• Express Delivery: 2-3 business days</li>
                <li>• International Shipping Available</li>
              </ul>
            </div>
          )}
          {details === "Reviews" && (
            <div className="space-y-3">
              <span className="font-semibold">Customer Reviews</span>
              {reviews.map((review, index) => (
                <div key={index} className="border-b pb-3">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1 text-yellow-400">
                      {Array.from({ length: 5 }).map((_, i) =>
                        i < review.rating ? (
                          <RiStarFill key={i} />
                        ) : (
                          <RiStarFill key={i} className="text-gray-300" />
                        )
                      )}
                    </div>
                    <p className="font-semibold mt-2">{review.name}</p>
                  </div>
                  <p className="text-gray-600 text-sm">{review.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
