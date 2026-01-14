import React from "react";

const AboutDetails = ({ details }) => {
  const leftDetails = details.slice(0, 4);
  const rightDetails = details.slice(4);

  const renderColumn = (items) =>
    items.map((item, idx) => (
      <p key={idx} className="text-muted-foreground text-sm sm:text-base">
        <span className="font-semibold text-[#ffffff]">{item.label}:</span>{" "}
        {item.value}
      </p>
    ));

  return (
    <div className="flex flex-col md:flex-row gap-8 mb-6">
      <div className="flex-1 space-y-2">{renderColumn(leftDetails)}</div>
      <div className="flex-1 space-y-2">{renderColumn(rightDetails)}</div>
    </div>
  );
};

export default AboutDetails;
