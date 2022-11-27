/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // "node_modules/react-daisyui/dist/**/*.tsx'],",
  ],
  plugins: [require("daisyui")],

  theme: {
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },

    fontFamily: {
      "poppins-regular": ["Poppins-Regular"],
    },
    // padding: {
    //   0.25: "1px",
    // },
    fontSize: {
      parasmall: "0.5rem",
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
    },
    extend: {
      colors: {
        gray: {
          100: "#f7fafc",
          200: "#edf2f7",
          300: "#e2e8f0",
          400: "#cbd5e0",
          500: "#a0aec0",
          600: "#718096",
          700: "#4a5568",
          800: "#2d3748",
          900: "#1a202c",
          1000: "#edf2f75e",
          1100: "#F2F2F2d9",
          1200: "#00000080",
          1300: "#f4f4f4",
          1400: "#E5E5E5",
          1500: "#00000033",
          1600: "#959494",
          1700: "#112211",
        },
        blue: {
          100: "#ebf8ff",
          200: "#bee3f8",
          300: "#90cdf4",
          400: "#63b3ed",
          500: "#4299e1",
          600: "#3182ce",
          700: "#2b6cb0",
          800: "#2c5282",
          900: "#2a4365",
        },
        brand: {
          yellow: "#FFCD29",
        },
        gradient: {
          purple: "#D538F6", // majenda
          blue: "#3271B6",
        },
        yellow: {
          100: "#F37C08",
          200: "#FFB800",
        },
      },
      boxShadow: {
        "3xl": "4px 4px 0px rgba(243, 124, 8, 1)",
      },
    },
  },
};
