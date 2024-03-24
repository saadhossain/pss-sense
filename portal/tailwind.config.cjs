/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': "#4066EF",
        'secondary': "#303263",
        'accent': "#24B299",
        'dark': "#1F2937"
      },
      fontFamily: {
        'noto': ['Noto Sans', 'sans-serif'],
        'fira': ['Fira Code', 'monospace']
      }
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "night"],
  },
};
