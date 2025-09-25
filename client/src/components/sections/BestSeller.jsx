import React, { useContext, useEffect, useState } from "react";
// Components
import Product from "../ui/Product.jsx";
import Title from "../Title.jsx";
// Context
import { ShopContext } from "../../context/CreateContext.js";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 4));
  }, []);

  return (
    <>
      <section className="bg-gray-200 px-8 py-4 xs:py-6 ss:px-12 ss:py-10 sm:px-16 sm:py-12 lg:px-28 xl:px-40 xl:py-20">
        <div>
          <Title text1={"BEST"} text2={"SELLER"} />
        </div>

        <div className="grid grid-cols-1 ss:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-10">
          {bestSeller.map((item, index) => (
            <Product
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              description={item.description}
              price={item.price}
              mainCategory={item.mainCategory}
              bestseller={item.bestseller}
              stock={item.stock}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default BestSeller;
