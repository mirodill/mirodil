import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const SectionCard = ({ children, className = "", noPadding = false }) => {
  const cardClasses = cn(
    "mt-4 w-full rounded-none border-0 border-t border-b border-[#0000001a] dark:border-[#ffffff1a] bg-transparent shadow-none",
    className
  );

  const contentClasses = noPadding ? "" : "px-6";

  return (
    <Card className={cardClasses}>
      <div className={contentClasses}>{children}</div>
    </Card>
  );
};

export default SectionCard;
