import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        brand: {
          black: "#0A0A0A",
          white: "#FAFAFA",
          gray: "#737373",
          "gray-light": "#D4D4D4",
        },
      },
      spacing: {
        "section": "120px",
      },
    },
  },
  plugins: [],
};

export default config;
