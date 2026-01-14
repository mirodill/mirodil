import React from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const SectionHeader = ({ title, className = "" }) => {
  return (
    <div className={cn("flex flex-col items-start", className)}>
      <h1 className="text-lg font-light px-6 uppercase tracking-widest">
        {title}
      </h1>
      <Separator className="mt-7 w-full" />
    </div>
  );
};

export default SectionHeader;
