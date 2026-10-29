/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['DM Sans', 'sans-serif'], display: ['Manrope', 'sans-serif'] },
      colors: { ink: '#171b31', muted: '#737991', brand: '#6558e8', lavender: '#f0edff' },
      boxShadow: { soft: '0 18px 60px rgba(33, 35, 74, .08)', card: '0 8px 30px rgba(33, 35, 74, .055)' },
      animation: { 'float-in': 'floatIn .55s cubic-bezier(.2,.75,.25,1) both', 'fade-in': 'fadeIn .35s ease-out both', 'pulse-soft': 'pulseSoft 2.4s ease-in-out infinite' },
      keyframes: {
        floatIn: { '0%': { opacity: '0', transform: 'translateY(14px) scale(.99)' }, '100%': { opacity: '1', transform: 'translateY(0) scale(1)' } },
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        pulseSoft: { '0%,100%': { opacity: '.65' }, '50%': { opacity: '1' } }
      }
    }
  },
  plugins: []
}