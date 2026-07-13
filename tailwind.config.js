/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0D10",
        surface: "#10161C",
        edge: "#22303A",
        paper: "#EDEFF7",
        dim: "#93A3AF",
        arcade: "#2EE86C",
        violet: "#4D9FFF",
        retro: "#2BD9C8",
      },
      fontFamily: {
        display: ["Archivo Black", "sans-serif"],
        body: ["Archivo", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
