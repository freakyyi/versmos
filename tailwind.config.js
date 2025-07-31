/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        // Standard breakpoints
        'xs': '475px',
        // Override default breakpoints for better control
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        // Custom breakpoints for high-res displays
        'fhd': '1920px',  // Full HD (1080p)
        '2k': '2048px',   // 2K displays
        'qhd': '2560px',  // Quad HD (1440p)
        '4k': '3840px',   // 4K displays
      },
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
        sans: ['var(--font-manrope)', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['var(--font-manrope)', 'system-ui', '-apple-system', 'sans-serif'],
        handwriting: ['var(--font-caveat)', 'cursive', 'system-ui'],
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
        '7xl': '1280px',
        '8xl': '1440px',
        '9xl': '1600px',
        '10xl': '1920px',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '3rem',
          xl: '4rem',
          '2xl': '5rem',
          'fhd': '6rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
          'fhd': '1920px',
          '2k': '2048px',
        }
      }
    },
  },
  plugins: [],
}