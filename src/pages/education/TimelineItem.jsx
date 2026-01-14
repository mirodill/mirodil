import React from "react";

const TimelineItem = ({ date, title, subtitle }) => {
  return (
    <div className="grid grid-cols-[1fr_40px_1fr] items-start gap-2 sm:gap-4">
      <div className="text-right pr-4 sm:pr-6 text-sm sm:text-lg text-gray-700 dark:text-gray-400 break-words">
        {date}
      </div>

      <div className="flex justify-center relative">
        <span className="w-3 h-3 bg-gray-800 dark:bg-white rounded-full mt-1 ring-2 ring-gray-400 dark:ring-gray-600" />
      </div>

      <div className="pl-4 sm:pl-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-sm sm:text-md text-gray-600 dark:text-gray-400 mt-1 break-words">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default TimelineItem;
