import React from "react";

const AboutImage = ({ src, alt }) => {
  return (
    <div className="w-full md:w-1/3 flex justify-center md:justify-start">
      <img
        src={src}
        alt={alt}
        className="
          w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72
          object-cover rounded-lg
          transition-transform duration-500 ease-in-out
          hover:scale-105 hover:shadow-md
        "
      />
    </div>
  );
};

export default AboutImage;
