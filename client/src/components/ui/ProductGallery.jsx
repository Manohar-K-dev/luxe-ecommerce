import React, { useState } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const ProductGallery = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images[0] || null);
  const [scrollIndex, setScrollIndex] = useState(0);

  const maxVisible = 4;

  if (!images || images.length === 0) return null;

  const visibleImages = images.slice(scrollIndex, scrollIndex + maxVisible);

  const handlePrev = () => {
    if (scrollIndex > 0) setScrollIndex(scrollIndex - 1);
  };

  const handleNext = () => {
    if (scrollIndex + maxVisible < images.length) {
      setScrollIndex(scrollIndex + 1);
    }
  };

  return (
    <div className="flex flex-col place-items-center gap-4">
      {/* Main Image */}
      <img
        src={activeImage}
        alt="Product"
        className="w-[500px] h-[500px] object-cover rounded-lg"
      />
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="relative flex items-center gap-2">
          {images.length > maxVisible && (
            <button
              onClick={handlePrev}
              disabled={scrollIndex === 0}
              className="p-2 bg-white border rounded-full shadow disabled:opacity-40"
            >
              <RiArrowLeftSLine size={20} />
            </button>
          )}
          <div className="flex gap-2 overflow-hidden">
            {visibleImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumb-${index}`}
                onClick={() => setActiveImage(img)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                  activeImage === img ? "border-blue-600" : "border-gray-200"
                }`}
              />
            ))}
          </div>
          {/* Right Arrow */}
          {images.length > maxVisible && (
            <button
              onClick={handleNext}
              disabled={scrollIndex + maxVisible >= images.length}
              className="p-2 bg-white border rounded-full shadow disabled:opacity-40"
            >
              <RiArrowRightSLine size={20} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
