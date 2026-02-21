/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'deep-night': '#0A0A0F',
        'midnight-blue': '#0F1123',
        'dark-indigo': '#1A1B3A',
        'twilight': '#252850',
        'moon-glow': '#E8E4D9',
        'soft-cream': '#F5F0E6',
        'lunar-white': '#FFFEF5',
        'silver-mist': '#C4C4D4',
        'celestial-blue': '#6B7FD7',
        'soft-lavender': '#9B8DC7',
        'river-teal': '#5BA4A4',
        'starlight-gold': '#D4AF37',
      },
      fontFamily: {
        heading: ['var(--font-quicksand)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'drift': 'drift 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 60px 30px rgba(255, 254, 245, 0.2)' },
          '50%': { boxShadow: '0 0 80px 40px rgba(255, 254, 245, 0.3)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        drift: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}

