/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#1b1b1b",
        light: "#fff",
        accent: "#7B00D3",
        accentDark: "#ffdb4d",
        gray: "#747474",
        lightBlue: "#7B8EC8",
      },
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      manrope: ["Manrope", "sans-serif"],
    },
  },
  darkMode: "class",
  plugins: [import("@tailwindcss/typography")],
};
