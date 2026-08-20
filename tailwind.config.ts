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
        paper: "#F7F4F0",
        surface: "#F0ECE7",
        line: "#D8D2CC",
        ink: "#4B4A4D",
        body: "#605C61",
        muted: "#7A7479",
        
        /* Verde oliva pastel suave */
        olive: {
          DEFAULT: "#8A9A7B",
          dark: "#7A8B6E",
          mist: "#EEF2EA",
        },
        
        blue: {
          DEFAULT: "#8797A6",
          dark: "#687A8B",
          mist: "#EBF0F3",
        },
        teal: {
          DEFAULT: "#7F9B98",
          dark: "#5F7B78",
        },
        sage: {
          DEFAULT: "#8A9A7B",
          dark: "#7A8B6E",
          mist: "#EDF0E9",
        },
        lavender: {
          DEFAULT: "#8B7896",
          dark: "#6E5E78",
          mist: "#EEEAF0",
        },
        graphite: "#384149",
      },
    },
  },
  plugins: [],
};

export default config;