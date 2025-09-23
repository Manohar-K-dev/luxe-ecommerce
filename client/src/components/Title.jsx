import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="text-gray-500 text-2xl xs:text-3xl ss:text-4xl font-bold text-center mb-6 ss:mb-10">
      {text1} <span className="font-medium text-gray-700">{text2}</span>
    </div>
  );
};

export default Title;
