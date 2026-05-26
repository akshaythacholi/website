import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        ink:        "#1D1D1F",
        accent:     "#1D1D1F",
        "accent-light": "#F5F5F7",
        muted:      "#6E6E73",
        "gray-apple": "#D2D2D7",
      },
      fontFamily: {
        serif: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        sans:  ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "7xl":  ["5rem",  { lineHeight: "1" }],
        "8xl":  ["6rem",  { lineHeight: "1" }],
        "9xl":  ["7.5rem",{ lineHeight: "0.95" }],
        "10xl": ["9rem",  { lineHeight: "0.9" }],
      },
    },
  },
  plugins: [],
};

export default config;
