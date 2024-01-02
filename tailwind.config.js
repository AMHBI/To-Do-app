/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "back-grad": "radial-gradient(#28b8d5,#020344)",
      },
      fontFamily: {
        vazir: "'Vazirmatn'",
      },
    },
  },
  plugins: [],
};
