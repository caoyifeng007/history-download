/* eslint-env node */
module.exports = {
  // purge: ['./index.html', './src/**/*.{js,ts,vue}'],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // important: true,
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1.5)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in',
        wigglere: 'wiggle 1s ease-out reverse',
      },
    },
  },
  plugins: [],
}
