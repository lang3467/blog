/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          100: '#2a2d35',
          200: '#23262d',
          300: '#1c1f26',
          400: '#16181e',
          500: '#0f1115',
          600: '#0a0c0f',
        },
      },
    },
  },
  plugins: [],
}
