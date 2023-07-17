/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgcColor: "#F2F2F2",
        mainCustomColor: "#2F80ED",
        mainCustomColorHover: "#2F80ED90",
        secondaryColor: "#FF7F50",
        textColor: "#333333",
        accentColor: "#66BB6A"
      }
    },
  },
  plugins: [],
}
