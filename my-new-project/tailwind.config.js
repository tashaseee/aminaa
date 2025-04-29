/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
      extend: {
        colors: {
          'noto-pink': '#F83D8E',
          'noto-purple': '#6B48FF',
          'noto-pink-dark': '#E62D7C',
          'noto-purple-dark': '#5A3FD6',
        },
      },
    },
    plugins: [],
  };