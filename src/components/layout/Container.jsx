import { cn } from "@/lib/utils";

const Container = ({ children, className = "" }) => {
  const containerClasses = cn(
    "mx-auto w-full sm:w-11/12 md:w-2/3 lg:w-2/3 max-w-7xl py-4 sm:py-6 border",
    className
  );

  return <div className={containerClasses}>{children}</div>;
};

export default Container;
