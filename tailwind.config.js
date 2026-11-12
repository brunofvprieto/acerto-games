/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050806",
        surface: "#0B110D",
        edge: "#1D2B20",
        paper: "#EDEFF7",
        dim: "#93A3AF",
        arcade: "#10B981",
        violet: "#4D9FFF",
        retro: "#2BD9C8",
      },
      fontFamily: {
        display: ["var(--font-archivo-black)", "Archivo Black", "sans-serif"],
        body: ["var(--font-archivo)", "Archivo", "sans-serif"],
        mono: ["var(--font-space-mono)", "Space Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
