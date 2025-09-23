import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <>
      <section
        className="relative h-screen overflow-hidden"
        style={{
          backgroundImage: `url('/bg.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-9 bg-black/30 place-content-center place-items-center h-screen text-white">
          <div className="flex flex-col items-center gap-8 sm:gap-10 md:gap-12">
            <h1 className="text-3xl xs:text-4xl ss:text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider font-[800] font-sec">
              Luxury Fashion
            </h1>
            <p className="text-base ss:text-lg sm:text-xl md:text-2xl lg:text-3xl font-light mx-8 xs:mx-10 ss:mx-14 sm:mx-24 md:mx-32">
              Discover the latest trends in premium clothing and accessories
            </p>
            <div className="flex gap-4 sm:gap-8 font-semibold text-sm ss:text-base md:text-lg">
              <button
                className="bg-light text-luxe py-4 px-3 xs:px-4 ss:px-5 sm:px-7 md:px-9  rounded-lg hover:opacity-90"
                onClick={() => navigate("/all-products")}
              >
                Shop Now
              </button>
              <button
                className="bg-transparent border-2 py-4 px-3 xs:px-4 ss:px-5 sm:px-7 md:px-9 rounded-lg hover:text-luxe hover:bg-light"
                onClick={() => navigate("/all-products")}
              >
                Explore Collection
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
