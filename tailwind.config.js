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
        primary: {
          gold: '#D4AF37',
          orange: '#FF6B35',
        },
        secondary: {
          red: '#B8860B',
        },
        accent: {
          saffron: '#F4A460',
        },
        text: {
          dark: '#1A1A1A',
          light: '#666',
        },
        background: {
          cream: '#FFF8F0',
        },
        success: {
          green: '#10B981',
        },
        error: {
          red: '#EF4444',
        },
        border: {
          gray: '#E5E7EB',
        }
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'orbit1': 'orbit1 12s linear infinite',
        'orbit2': 'orbit2 12s linear infinite reverse',
        'orbit3': 'orbit3 12s linear infinite',
        'orbit4': 'orbit4 12s linear infinite reverse',
        'orbit5': 'orbit5 12s linear infinite',
        'centerFloat': 'centerFloat 4s ease-in-out infinite alternate',
        'slideInUp': 'slideInUp 1s ease-out both',
        'slideInRight': 'slideInRight 1.2s ease-out both',
        'sparkle': 'sparkle 3s ease-in-out infinite',
      },
      keyframes: {
        orbit1: {
          '0%': { transform: 'translateX(-50%) translateY(-50%) rotate(0deg) translateX(150px) rotate(0deg)' },
          '100%': { transform: 'translateX(-50%) translateY(-50%) rotate(360deg) translateX(150px) rotate(-360deg)' },
        },
        orbit2: {
          '0%': { transform: 'translateX(-50%) translateY(-50%) rotate(0deg) translateX(125px) rotate(0deg)' },
          '100%': { transform: 'translateX(-50%) translateY(-50%) rotate(-360deg) translateX(125px) rotate(360deg)' },
        },
        orbit3: {
          '0%': { transform: 'translateX(-50%) translateY(-50%) rotate(0deg) translateX(170px) rotate(0deg)' },
          '100%': { transform: 'translateX(-50%) translateY(-50%) rotate(360deg) translateX(170px) rotate(-360deg)' },
        },
        orbit4: {
          '0%': { transform: 'translateX(-50%) translateY(-50%) rotate(0deg) translateX(105px) rotate(0deg)' },
          '100%': { transform: 'translateX(-50%) translateY(-50%) rotate(-360deg) translateX(105px) rotate(360deg)' },
        },
        orbit5: {
          '0%': { transform: 'translateX(-50%) translateY(-50%) rotate(0deg) translateX(190px) rotate(0deg)' },
          '100%': { transform: 'translateX(-50%) translateY(-50%) rotate(360deg) translateX(190px) rotate(-360deg)' },
        },
        centerFloat: {
          '0%, 100%': { transform: 'translateX(-50%) translateY(-50%) scale(1)' },
          '50%': { transform: 'translateX(-50%) translateY(-55%) scale(1.1)' },
        },
        slideInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(50px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}