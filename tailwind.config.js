/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(100 95 198)",
        "dark-side": "#2c2c38",
        "dark-main": "#21212d",
        "dark-gray": "#828FA3",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
