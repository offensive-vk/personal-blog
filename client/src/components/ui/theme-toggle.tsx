import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    // Initialize theme state based on current document class or localStorage
    const storedTheme = localStorage.getItem("theme");
    const isDarkMode = document.documentElement.classList.contains("dark");
    
    // Prefer localStorage value if available, otherwise use class
    if (storedTheme) {
      setTheme(storedTheme as "light" | "dark");
    } else {
      setTheme(isDarkMode ? "dark" : "light");
    }
  }, []);

  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    // Update document class
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);

    // Save theme preference to local storage
    localStorage.setItem("theme", newTheme);

    // Update the appearance in theme.json
    fetch("/api/theme", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ appearance: newTheme }),
    }).catch(error => console.error("Error updating theme:", error));
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="mr-2"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
}