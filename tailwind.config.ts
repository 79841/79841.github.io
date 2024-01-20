import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "show-up": {
          from: { width: "5rem", height: "5rem" },
          to: { width: "15rem", height: "15rem" },
        },
        rising: {
          from: { opacity: "0", transform: "translateY(35px)" },
          to: { opacity: "1", tranform: "translateY(0)" },
        },
        "indicator-show-up": {
          "0%": {
            width: "0rem",
            height: "0rem",
          },
          "80%": {
            width: "3.6rem",
            height: "3.5rem",
          },
          "100%": {
            width: "11rem",
            height: "3.5rem",
          },
        },
        "indicator-disappear": {
          "0%": {
            width: "10rem",
            height: "3.5rem",
          },
          "20%": {
            width: "3.6rem",
            height: "3.5rem",
          },
          "100%": {
            width: "0rem",
            height: "0rem",
          },
        },
      },
      animation: {
        "show-up": "1s ease-in-out 1 forwards show-up",
        rising: "1.5s ease-in-out 1 forwards rising",
        "indicator-show-up": "1.5s ease-in-out 1 forwards indicator-show-up",
        "indicator-disappear":
          "1.5s ease-in-out 1 forwards indicator-disappear",
      },
    },
  },
  plugins: [],
};
export default config;
