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
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", tranform: "translateY(0)" },
        },
      },
      animation: {
        "show-up": "1s ease-in-out 1 forwards show-up",
        rising: "1s ease-in-out 1 forwards rising",
      },
    },
  },
  plugins: [],
};
export default config;
