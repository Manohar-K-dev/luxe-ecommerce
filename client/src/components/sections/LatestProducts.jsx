import React, { useContext, useEffect, useState } from "react";
// Context
// import { ShopContext } from "../../context/CreateContext";
import Title from "../Title";
import Product from "../ui/Product";
import { ShopContext } from "../../context/ShopContext";

const LatestProducts = () => {
  const { products } = useContext(ShopContext);

  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 4));
  }, [products]);

  return (
    <>
      <section className="px-8 py-4 xs:py-6 ss:px-12 ss:py-10 sm:px-16 sm:py-12 lg:px-28 xl:px-40 xl:py-20">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />

        <div className="grid grid-cols-1 ss:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-10">
          {latestProducts.map((item, index) => (
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

export default LatestProducts;
