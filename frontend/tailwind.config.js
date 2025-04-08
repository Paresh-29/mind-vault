/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          100: "#eeeeef",
          200: "#e6e9ed",
          600: "#95989c",
        },
        indigo: {
          100: "#e0e6fe",
          600: "#5047e5",
        },
        dark: {
          800: "#1f2937",
          700: "#374151",
        },
      },
    },
  },
  plugins: [],
};
