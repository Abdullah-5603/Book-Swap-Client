/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "card-btn": "#FF5733", // Background color for your custom button
      },
      textColor: {
        "card-btn-text": "#FFFFFF", // Text color for your custom button
      },
    },
  },
  daisyui : {
    themes : ['light']
  },
  plugins: [require('daisyui')],
}