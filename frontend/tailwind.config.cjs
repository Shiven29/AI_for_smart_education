/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#090D16',
        card: '#121829',
        'card-hover': '#161F36',
        'card-border': '#1E293B',
        'card-border-highlight': '#6366F1',
        primary: {
          DEFAULT: '#6366F1',
          hover: '#4F46E5',
          light: '#818CF8',
          dark: '#4338CA',
          purple: '#8B5CF6'
        },
        cyan: {
          DEFAULT: '#22D3EE',
          glow: '#38BDF8',
          accent: '#06B6D4'
        },
        status: {
          success: '#10B981',
          'success-bg': '#0D2821',
          'success-border': '#065F46',
          warning: '#F59E0B',
          'warning-bg': '#291E0F',
          'warning-border': '#78350F',
          purple: '#A855F7',
          'purple-bg': '#21163B',
          'purple-border': '#581C87',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-purple': '0 0 25px -5px rgba(99, 102, 241, 0.4)',
        'glow-cyan': '0 0 25px -5px rgba(34, 211, 238, 0.3)',
        'card-glow': '0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 15px -3px rgba(99, 102, 241, 0.15)',
      }
    },
  },
  plugins: [],
}
