import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        alert: "#b30606",
        gold: "#dbae08",
        progress: "#32cd32",
        buy: "#139622",
        refuse: "#cb2a2a",
        whatsapp: "#075e54",
        navy: "#112d58"
      },
      fontFamily: {
        montserrat: ["Montserrat", "Arial", "sans-serif"],
        open: ["Open Sans", "Arial", "sans-serif"]
      },
      boxShadow: {
        video: "0 22px 80px rgba(0, 0, 0, 0.28)"
      }
    }
  },
  plugins: []
};

export default config;
