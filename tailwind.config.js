/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Midnight — the canvas */
        ink: {
          950: '#070919',
          900: '#0A0C20',
          850: '#0E1128',
          800: '#131631',
          700: '#1A1E3D',
          600: '#252A4D',
          500: '#2F364B',
          400: '#3E465F',
        },
        /* Cool white — type */
        bone: {
          50: '#F4F6FC',
          100: '#E2E6F1',
          200: '#C1C8D8',
          300: '#98A1B7',
          400: '#6E7792',
        },
        /* Neural violet — primary accent */
        electric: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
        },
        /* Plasma cyan — secondary accent */
        cyan: {
          200: '#A5F3FC',
          300: '#67E8F9',
          400: '#45DCF2',
          500: '#22C3E6',
          600: '#0891B2',
        },
        /* Magenta — tertiary highlight */
        plasma: {
          300: '#F0ABFC',
          400: '#E879F9',
          500: '#D946EF',
        },
        signal: {
          green: '#4FE3A1',
          amber: '#FBBF5C',
          red: '#FB7185',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.045em',
        tighter: '-0.035em',
        label: '0.18em',
        luxe: '0.26em',
      },
      animation: {
        blink: 'blink 1.1s steps(2) infinite',
        'pulse-dot': 'pulseDot 2.4s ease-in-out infinite',
        rise: 'rise 1.1s cubic-bezier(0.22, 1, 0.36, 1) both',
        aurora: 'aurora 18s ease-in-out infinite',
        'aurora-2': 'aurora2 22s ease-in-out infinite',
        'border-spin': 'borderSpin 6s linear infinite',
        node: 'node 3.6s ease-in-out infinite',
        scan: 'scan 7s cubic-bezier(0.65, 0, 0.35, 1) infinite',
        halo: 'halo 4s cubic-bezier(0.22, 1, 0.36, 1) infinite',
        'spin-slow': 'spin 40s linear infinite',
        'spin-rev': 'spinRev 60s linear infinite',
        'spin-arc': 'spin 9s linear infinite',
        float: 'float 7s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.8)' },
        },
        rise: {
          from: { opacity: '0', transform: 'translateY(18px)', filter: 'blur(8px)' },
          to: { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
        },
        aurora: {
          '0%, 100%': { transform: 'translate(-50%, 0) rotate(0deg) scale(1)' },
          '50%': { transform: 'translate(-44%, 40px) rotate(12deg) scale(1.12)' },
        },
        aurora2: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-80px, 60px) scale(1.15)' },
        },
        borderSpin: {
          to: { '--angle': '360deg' },
        },
        node: {
          '0%, 100%': { opacity: '0.35', r: '1.6' },
          '50%': { opacity: '1', r: '2.6' },
        },
        halo: {
          '0%': { transform: 'scale(1)', opacity: '0.55' },
          '100%': { transform: 'scale(1.75)', opacity: '0' },
        },
        spinRev: {
          to: { transform: 'rotate(-360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '15%, 85%': { opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
