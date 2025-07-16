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
        orange: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#FF5630',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        brand: {
          black: '#000000',
          cyan: '#25A3AB',
          darkest: '#0D1F23',
          dark: '#132E35',
          'medium-dark': '#2D4A53',
          medium: '#69818D',
          light: '#AFB3B7',
          accent: '#5A636A',
        }
      },
      fontFamily: {
        sans: ['var(--font-nohemi)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      height: {
        header: '84px',
      },
      minHeight: {
        hero: '636px',
      },
      zIndex: {
        header: '99999',
      },
      maxWidth: {
        '8xl': '1440px',
      }
    },
  },
  plugins: [],
}