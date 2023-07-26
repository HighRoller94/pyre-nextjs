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
        headerClamp: "clamp(1rem, 5vw, 3rem)",
        bodyClamp: "clamp(1rem, 5vw, 3rem)",
      },
      fontFamily: {
        sans: ['var(--font-figtree)']
      },
      animation: {
        typing: "typing 1s"
      },
      keyframes: {
        typing: {
          from: { width: "0" },
          to: { width: "20ch" }
        }
      },
    },
  },
  plugins: [],
};
