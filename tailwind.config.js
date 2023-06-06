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
      boxShadow: {
        dark: `4px 4px rgba(0,0,0,1)`,
      },
    },
  },
  plugins: [],
}
