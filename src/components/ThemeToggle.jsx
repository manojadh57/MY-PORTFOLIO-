// ThemeToggle.jsx
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const THEMES = {
  light: {
    name: "Light",
    icon: Sun,
    vars: {
      "--bg": "#ffffff",
      "--fg": "#111111",
      "--border": "#111111",
      "--card": "#ffffff",
      "--accent": "#ffd600",
      "--muted": "#757575",
      "--shadow-weak": "rgba(0,0,0,0.12)",
      "--shadow-strong": "rgba(0,0,0,0.18)",
    },
  },
  dark: {
    name: "Dark",
    icon: Moon,
    vars: {
      "--bg": "#0a0a0a",
      "--fg": "#f5f5f5",
      "--border": "#333333",
      "--card": "#111111",
      "--accent": "#ffd600",
      "--muted": "#aaaaaa",
      "--shadow-weak": "rgba(0,0,0,0.5)",
      "--shadow-strong": "rgba(0,0,0,0.6)",
    },
  },
};

export default function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme");
    const systemPrefers = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const initialTheme = saved && THEMES[saved] ? saved : systemPrefers;

    setTheme(initialTheme);
    setMounted(true);
  }, []);

  // Apply theme when it changes
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const themeConfig = THEMES[theme];

    // Apply CSS custom properties
    Object.entries(themeConfig.vars).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // Save to localStorage
    localStorage.setItem("portfolio-theme", theme);

    // Update document class for any theme-specific styling
    root.setAttribute("data-theme", theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div
        className={`w-12 h-12 border-2 border-black bg-white shadow-[3px_3px_0_#000] ${className}`}
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-4 h-4 bg-gray-300 animate-pulse rounded-full" />
        </div>
      </div>
    );
  }

  const currentTheme = THEMES[theme];
  const Icon = currentTheme.icon;
  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative overflow-hidden
        w-12 h-12 
        border-2 border-black bg-white 
        shadow-[3px_3px_0_#000] 
        hover:shadow-[4px_4px_0_#000]
        hover:-translate-x-0.5 hover:-translate-y-0.5
        active:translate-x-[1px] active:translate-y-[1px]
        active:shadow-[2px_2px_0_#000]
        transition-all duration-150
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400
        group
        ${className}
      `}
      aria-label={`Switch to ${THEMES[nextTheme].name.toLowerCase()} mode`}
      title={`Switch to ${THEMES[nextTheme].name.toLowerCase()} mode`}
    >
      {/* Background color that changes based on theme */}
      <div
        className={`absolute inset-0 transition-colors duration-300 ${
          theme === "dark" ? "bg-gray-900" : "bg-white"
        }`}
      />

      {/* Icon container */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <Icon
          className={`w-5 h-5 transition-all duration-300 group-hover:scale-110 ${
            theme === "dark" ? "text-yellow-400" : "text-gray-900"
          }`}
        />
      </div>

      {/* Subtle animation overlay */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
          theme === "dark"
            ? "bg-gradient-to-br from-yellow-400/10 to-transparent opacity-100"
            : "bg-gradient-to-br from-gray-900/5 to-transparent opacity-0 group-hover:opacity-100"
        }`}
      />
    </button>
  );
}
