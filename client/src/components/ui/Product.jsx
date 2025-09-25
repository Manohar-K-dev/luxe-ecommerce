import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/CreateContext";
import { RiMedalLine } from "react-icons/ri";

const Product = ({
  id,
  image,
  name,
  price,
  mainCategory,
  bestseller,
  stock,
  description,
}) => {
  const productName =
    name && name.length >= 20 ? name.substring(0, 20) + ".." : name;

  const productDescription =
    description && description.length >= 30
      ? description.substring(0, 30) + "..."
      : description;

  const { currency } = useContext(ShopContext);

  return (
    <div
      className={`relative h-80 w-60 md:h-full md:w-full grid cursor-pointer text-white rounded-xl overflow-hidden shadow-md md:hover:shadow-xl duration-300 ${
        stock > 0 ? "opacity-100" : "opacity-80"
      }`}
    >
      <Link to={`/product/${id}`} className="overflow-hidden">
        <img
          src={
            (Array.isArray(image) && image.length > 0 && image[0]) ||
            "/placeholder.jpg"
          }
          alt={name}
          className="h-full w-full object-cover md:hover:scale-105 transition duration-300"
        />
      </Link>
      <div className="flex flex-col justify-end">
        <div className="absolute top-0 w-full font-medium flex justify-between">
          <p className="bg-gray-500 text-gray-100 rounded-md px-1 py-1 text-[10px]">
            {mainCategory}
          </p>
          {bestseller && (
            <div className="bg-luxe rounded-t rounded-full text-sm h-6 w-5 flex items-center justify-center">
              <RiMedalLine className="" />
            </div>
          )}
        </div>
        <div className="bg-gray-300 px-4 py-2 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h2 className="text-gray-800 md:text-lg font-semibold md:font-bold">
              {productName}
            </h2>
            <p className="text-gray-600 hidden md:block">
              {productDescription}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <h3 className="text-luxe md:text-lg font-bold">
              {currency}
              {price}
            </h3>
            <button className="bg-luxe text-sm px-3 py-2 rounded-lg">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
