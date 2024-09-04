/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        Primary: "#000000",
        Secondry: "#020D49",
        AscentOne: "#888888",
        AscentTwo: "#2a2a2a",
        White: "#ffffff",
        Gray: "#A1A1A1",
        CardBg: "#f7f7f7",
        Black: "#000000"
      }
    },
  },
  plugins: [],
}

