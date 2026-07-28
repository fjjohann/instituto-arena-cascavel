import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#000706",
        forest: "#014227",
        green: "#044024",
        lime: "#ACE121",
        paper: "#F7F9F7",
        muted: "#5F6B63"
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Arial", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
