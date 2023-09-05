/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "base": "1rem",
        "small": "clamp(1rem, 2vw, 1.25rem)",
        "medium": "clamp(1.5rem, 2.5vw, 2rem)",
        "large": "clamp(2rem, 3vw, 6rem)",
      },
      fontFamily: {
        sans: ["var(--font-figtree)"],
      },
      animation: {
        typing: "typing 1s",
      },
      keyframes: {
        typing: {
          from: { width: "0" },
          to: { width: "20ch" },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
