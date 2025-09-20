import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./styles/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Space Grotesk'", ...fontFamily.sans],
        mono: ["'IBM Plex Mono'", ...fontFamily.mono]
      },
      colors: {
        interstellar: {
          50: "#eef2ff",
          100: "#d6d8ff",
          200: "#b3b9ff",
          300: "#8090ff",
          400: "#4d66ff",
          500: "#2f40f7",
          600: "#1f2dcd",
          700: "#19259d",
          800: "#151f75",
          900: "#0e154c"
        }
      },
      backgroundImage: {
        starfield: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15) 0%, transparent 40%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.1) 0%, transparent 45%), radial-gradient(circle at 50% 70%, rgba(255,255,255,0.08) 0%, transparent 50%)"
      },
      animation: {
        "pulse-slow": "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
