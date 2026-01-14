import React from "react";

const AboutBio = ({ text }) => {
  return (
    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
      {text}
    </p>
  );
};

export default AboutBio;
