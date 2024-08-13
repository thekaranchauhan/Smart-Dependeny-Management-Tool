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
        primary: '#ff4d4d',
        secondary: '#4dff88',
        accent: '#4d79ff',
        background: '#1a1a1a', 
        text: '#ffffff', 
        dark: {
          background: '#1a1a1a',
          text: '#ffffff',
        },
      },
    },
  },
  plugins: [],
};
export default config;
