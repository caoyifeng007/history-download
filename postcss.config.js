/* eslint-env node */
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(import.meta.env.MODE === 'production' ? { cssnano: {} } : {}),
  },
}
