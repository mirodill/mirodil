import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const AppButton = ({ children, className = "", loading = false, ...props }) => {
  const buttonClasses = cn(
    "relative w-full overflow-hidden transition-all duration-300",
    "hover:scale-[1.02] active:scale-95",
    "cursor-pointer",
    loading ? "cursor-wait" : "",
    className
  );

  return (
    <Button className={buttonClasses} disabled={loading} {...props}>
      {children}
    </Button>
  );
};

export default AppButton;
