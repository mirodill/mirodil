import React from "react";

const AboutImage = ({ src, alt }) => {
  return (
    <div className="w-full md:w-1/3 flex justify-center md:justify-start">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="
          w-56 h-56 sm:w-64 sm:h-64 md:w-96 md:h-96
          object-cover rounded-lg
          transition-transform duration-500 ease-in-out
          hover:scale-105 hover:shadow-md

        "
      />
    </div>
  );
};

export default AboutImage;
