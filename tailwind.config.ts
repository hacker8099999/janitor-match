import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        panel: "#0b0d12",
        ink: "#111827",
        accent: "#8b5cf6",
        accentSoft: "#c4b5fd",
      },
      boxShadow: {
        glow: "0 0 30px rgba(139, 92, 246, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
