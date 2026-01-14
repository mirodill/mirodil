import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SimpleModeToggle() {
  const toggleTheme = () => {
    const html = document.documentElement;
    const isDark = html.classList.contains("dark");

    html.classList.toggle("dark");
    localStorage.theme = isDark ? "light" : "dark";
  };

  const isDark = document.documentElement.classList.contains("dark");

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="h-10 w-10 rounded-full transition-colors"
      aria-label="Mavzuni o'zgartirish"
    >
      {isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}
