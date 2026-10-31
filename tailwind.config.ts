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
        mist: "#EAF3FA", // secciones suaves y fondo de tarjetas
        sky: {
          DEFAULT: "#BFDDF2", // celeste de marca: pastilla activa, bordes, detalles
          strong: "#5BA8DB", // celeste intenso: etiqueta "Nuevo"
        },
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 12px rgba(30, 43, 58, 0.07)",
        "card-hover": "0 10px 28px rgba(30, 43, 58, 0.14)",
        cover: "0 8px 20px rgba(30, 43, 58, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
