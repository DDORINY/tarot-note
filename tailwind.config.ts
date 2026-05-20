import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        night: "#090713",
        plum: "#211034",
        violetInk: "#36204f",
        gold: "#d8b35c",
        softGold: "#f2df9b",
        mist: "#d8d1e8"
      },
      boxShadow: {
        glow: "0 0 35px rgba(216, 179, 92, 0.18)"
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
