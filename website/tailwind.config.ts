import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme colors
        dark: {
          DEFAULT: '#0A0A0A',
          surface: '#141414',
          lighter: '#1A1A1A',
        },
        // Light theme colors
        light: {
          DEFAULT: '#FAFAF9',
          surface: '#FFFFFF',
          darker: '#F5F5F4',
        },
        // Primary accent (gold)
        gold: {
          DEFAULT: '#C9A962',
          light: '#D4BA7A',
          dark: '#B89B4F',
        },
        // Copper accent
        copper: {
          DEFAULT: '#B87333',
          light: '#C98544',
          dark: '#A66322',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-lg': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'display-sm': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #C9A962 0%, #B87333 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0A0A0A 0%, #141414 100%)',
        'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'text-reveal': 'textReveal 0.8s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        textReveal: {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      transitionTimingFunction: {
        'ease-out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'ease-in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
      boxShadow: {
        'glow': '0 0 40px rgba(201, 169, 98, 0.3)',
        'glow-lg': '0 0 60px rgba(201, 169, 98, 0.4)',
        'inner-glow': 'inset 0 0 40px rgba(201, 169, 98, 0.1)',
      },
    },
  },
  plugins: [],
}

export default config
