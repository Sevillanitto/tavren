import type { Config } from "tailwindcss";

// Paleta de marca: cámbiala aquí y se actualiza en toda la web.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1E2B3A", // texto y botón de compra (nunca negro puro)
        mist: "#F7FAFC", // fondo de secciones y tarjetas
        line: "#E6EDF2", // bordes
        pill: "#D9E3EA", // borde de las pastillas
        // Color de la pastilla de categoría en las tarjetas (cámbialo aquí).
        category: {
          noir: "#B8332B",
        },
        sky: {
          DEFAULT: "#E3EDF5", // celeste de marca: solo detalles mínimos
          strong: "#8FB8D6", // celeste intenso: acentos puntuales
        },
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        cover: "0 8px 20px rgba(30, 43, 58, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
