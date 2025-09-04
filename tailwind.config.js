/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        fg: "var(--fg)",
        border: "var(--border)",
        card: "var(--card)",
        accent: "var(--accent)",
        muted: "var(--muted)",
      },
      fontFamily: {
        // Use CSS vars so themes can swap fonts without code changes
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        display: ["var(--font-display)"],
      },
      boxShadow: {
        brutalWeak: "6px 6px 0 var(--shadow-weak)",
        brutalStrong: "8px 8px 0 var(--shadow-strong)",
      },
    },
  },
  plugins: [],
};
