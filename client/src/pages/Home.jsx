import React from "react";
// components
import Header from "../components/Header";
import Hero from "../components/sections/Hero.jsx";
import Footer from "../components/Footer.jsx";
import LatestProducts from "../components/sections/LatestProducts.jsx";
import BestSeller from "../components/sections/BestSeller.jsx";

const Home = () => {
  return (
    <>
      <Hero />
      <LatestProducts />
      <BestSeller />
    </>
  );
};

export default Home;
