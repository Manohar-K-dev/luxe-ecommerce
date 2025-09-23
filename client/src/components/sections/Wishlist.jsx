import React from "react";
import { useNavigate } from "react-router-dom";
import { wishlists } from "../../assets/myassets";

const Wishlist = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="font-bold text-2xl tracking-wide">My Wishlist</h1>
      <div className="grid grid-cols-3 gap-8 my-8">
        {wishlists.map((wishlist, index) => (
          <div
            key={index}
            className="cursor-pointer rounded-2xl shadow-md bg-white overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <div onClick={() => navigate("/product/:productId")}>
              <img
                src={wishlist.image}
                alt="Product"
                className="w-full h-60 object-cover"
              />
            </div>
            <div className="bg-white rounded-b-2xl px-6 py-5 flex flex-col gap-2">
              <h1 className="font-semibold text-base">{wishlist.name}</h1>
              <p className="text-luxe font-semibold">{wishlist.price}</p>
              <button className="bg-luxe text-white px-6 py-2 rounded-lg">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Wishlist;
