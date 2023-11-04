/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        SpaceMono: ["monospace"],
      },
      dropShadow: {
        glow: [
          "0 0px 20px rgba(255,255, 255, 4)",
          "0 0px 65px rgba(255, 255,255, 4)",
        ],
      },
    },
  },
  plugins: [],
};
