import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff5f5',
          100: '#ffeaea',
          200: '#ffd6d6',
          300: '#ffb3b3',
          400: '#ff7a7a',
          500: '#ef233c',
          600: '#ff1744',
          700: '#d90429',
          800: '#a3001a',
          900: '#7a0013',
          950: '#4a000a',
        },
        secondary: {
          50: '#fff5f5',
          100: '#ffeaea',
          200: '#ffd6d6',
          300: '#ffb3b3',
          400: '#ff7a7a',
          500: '#ff1744',
          600: '#ef233c',
          700: '#d90429',
          800: '#a3001a',
          900: '#7a0013',
          950: '#4a000a',
        },
        accent: {
          50: '#fffbe5',
          100: '#fff3bf',
          200: '#ffe066',
          300: '#ffd60a',
          400: '#ffb703',
          500: '#ffb703',
          600: '#ff9900',
          700: '#ff8800',
          800: '#ff7700',
          900: '#ff6600',
          950: '#cc5200',
        },
      },
      fontFamily: {
        primary: ['Inter', 'sans-serif'],
        secondary: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'ecommerce-gradient': 'linear-gradient(135deg, #ef233c 0%, #ff1744 100%)',
        'ecommerce-gradient-reverse': 'linear-gradient(135deg, #ff1744 0%, #ef233c 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'bounce-in': 'bounceIn 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s infinite',
        'stagger-1': 'fadeIn 0.6s ease-out 0.1s both',
        'stagger-2': 'fadeIn 0.6s ease-out 0.2s both',
        'stagger-3': 'fadeIn 0.6s ease-out 0.3s both',
        'stagger-4': 'fadeIn 0.6s ease-out 0.4s both',
        'stagger-5': 'fadeIn 0.6s ease-out 0.5s both',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: 'calc(200px + 100%) 0' },
        },
      },
      boxShadow: {
        'ecommerce': '0 10px 25px -5px rgba(239, 35, 60, 0.08), 0 10px 10px -5px rgba(239, 35, 60, 0.04)',
        'ecommerce-hover': '0 20px 25px -5px rgba(239, 35, 60, 0.12), 0 10px 10px -5px rgba(239, 35, 60, 0.06)',
      },
    },
  },
  plugins: [],
}

export default config 