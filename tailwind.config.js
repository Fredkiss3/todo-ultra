/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./resources/**/*.{edge,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#9f6dec',
        },
        background: {
          DEFAULT: '#f9f4f0',
        },
      },
    },
  },
  plugins: [],
}
