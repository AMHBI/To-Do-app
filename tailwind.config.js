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
      boxShadow: {
        box: "rgba(255,255,255, 0.35) 0px 14px 28px, rgba(255,255,255, 0.32) 0px 10px 10px;",
      },
    },
  },
  plugins: [],
};
