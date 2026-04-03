import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#006766",
        primaryLight: "#0A8280",
        bgMain: "#F9F9FF",
        textDark: "#1A365D",
        textGray: "#3E4948",
        inputBg: "#DEE8FF",
      },
    },
  },
  plugins: [],
};

export default config;