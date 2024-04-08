import type { Config } from "tailwindcss";
/** @type {import('tailwindcss').Config} */

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily:{
        "bebas" : ["bebas"],
        "titillium" : ["titillium"]
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
          // "Tennis": "url(./assets/images/Tennis.jpg)",
          // "Basketball": "url(./assets/images/basketball.jpg)",
          // "Soccer": "url(./assets/images/soccer.jpg)",
          // "Baseball": "url(./assets/images/baseball.jpg)",
          // "Volleyball": "url(./assets/images/volleyball.jpg)",
          // "Wrestling": "url(./assets/images/wrestling.jpg)",
          // "Golf": "url(./assets/images/golf.jpg)",
          // "Swimming": "url(./assets/images/swimming.jpg)",
          // "Hockey": "url(./assets/images/hockey.jpg)",
          // "Gymnastics": "url(./assets/images/gymnastics.jpg)",
          // "Track-and-Field": "url(./assets/images/trackandfield.jpg)",
          // "Water-Polo": "url(./assets/images/waterpolo.jpg)"

      },
    },
  },
  plugins: [
    require("flowbite/plugin"),

  ],
};
export default config;
