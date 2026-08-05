/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        /* ---- Tema claro ----
           ink     = fundo principal do site (agora branco)
           surface = fundo de cartões e blocos
           edge    = bordas
           paper   = texto principal (agora escuro)
           dim     = texto secundário
           shade   = overlay escuro usado SOBRE imagens (heros/banners)
           As cores de destaque foram escurecidas para ter contraste
           suficiente sobre fundo branco (AA da WCAG). */
        ink: "#FFFFFF",
        surface: "#F4F7F9",
        edge: "#D6DEE5",
        paper: "#111820",
        dim: "#54636F",
        shade: "#0A0D10",
        arcade: "#0A7A36",
        violet: "#1A5FC8",
        retro: "#0A7F76",
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
