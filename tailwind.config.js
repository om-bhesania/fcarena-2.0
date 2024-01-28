/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      maxWidth: '1320px',
      center: true,
      padding: "1rem", 
    },
    extend: {
      fontFamily: {
        heading: ['Droid Sans'],
        chilanka: ['Chilanka']
      },
      colors: {
        primary: "#004F2D",
        secondary: "#EDF67D",
        bodyTextLight: "#F2FFEF",
        bodyTextDark: "#1C0F13",
        boxShadow: "#1D1D1D59"
      },
    },
  },
  plugins: [],
};
