import React from "react";
import TimelineItem from "./TimelineItem";

const Timeline = ({ items }) => {
  return (
    <div className="relative py-8">
      <div className="absolute left-1/2 top-0 h-full w-px bg-gray-300 dark:bg-gray-600 -translate-x-1/2" />

      <div className="space-y-20">
        {items.map((item, index) => (
          <TimelineItem
            key={index}
            date={item.date}
            title={item.title}
            subtitle={item.subtitle}
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline;
