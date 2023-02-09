/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#101727",
        secondary:"#9FA4AA",
        success:  "#13ad2d",
        error: "#ad0505",
        disabled: "#E4E7EC",
      }
    },
  },
  plugins: [],
}
