/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        xv: {
          black: "#0a0404", // Fondo más oscuro
          dark: "#1a0a0a", // Fondo principal
          wine: "#3d0c0c", // Borgoña oscuro
          red: "#6b1520", // Rojo profundo
          burgundy: "#8B0000", // Rojo elegante
          cardinal: "#C41E3A", // Rojo vibrante (acentos)
          gold: "#D4AF37", // Dorado principal
          "gold-light": "#E8D48B", // Dorado claro
          cream: "#FFF8F0", // Crema para texto
          rose: "#D4918E", // Rosa empolvado
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        script: ['"Cormorant Garamond"', "serif"],
        body: ['"Montserrat"', "sans-serif"],
      },
      backgroundImage: {
        velvet: "linear-gradient(to bottom, #4a0810, #7a101b, #4a0810)",
      },
    },
  },
  plugins: [],
};
