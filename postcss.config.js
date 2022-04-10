/* eslint-env node */
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // ...(import.meta.env.PROD ? { cssnano: {} } : {}),
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
}
