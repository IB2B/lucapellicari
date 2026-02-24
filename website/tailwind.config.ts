import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Soft Blue & Cream Palette - Psychology/Personal Branding
        navy: {
          DEFAULT: '#3D5A73',  // Soft Steel Blue - headings (calm, trustworthy)
          dark: '#2C4356',     // Deep Blue-Gray - dark sections
          light: '#5A7A94',    // Hover state
        },
        teal: {
          DEFAULT: '#6B9BAE',  // Muted Sky Blue - accents, trust
          dark: '#5A8899',     // Hover
          light: '#8FB8C7',    // Light accent
          50: '#F0F6F8',       // Soft blue-gray background
        },
        coral: {
          DEFAULT: '#C4956A',  // Warm Gold/Caramel - CTAs, warmth
          dark: '#A87D55',     // Hover
          light: '#D9B896',    // Light gold
        },
        cream: {
          DEFAULT: '#FAF7F2',  // Warm Cream - backgrounds
          dark: '#EDE8DF',     // Slightly darker cream
          light: '#FFFDF9',    // Almost white
        },
        // Keep gray scale for utilities
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'DM Sans', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Playfair Display', 'Georgia', 'serif'],
      },
      fontSize: {
        'hero': ['clamp(3.5rem, 10vw, 8rem)', { lineHeight: '1', letterSpacing: '-0.03em', fontWeight: '500' }],
        'display': ['clamp(2.75rem, 6vw, 5rem)', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        'title': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'subtitle': ['clamp(1.125rem, 2vw, 1.375rem)', { lineHeight: '1.6' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75' }],
      },
      letterSpacing: {
        'tight': '-0.025em',
        'tighter': '-0.04em',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'progress': 'progress 3s linear forwards',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        progress: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}

export default config
