module.exports = {
  content: [
    './Views/**/*.cshtml', // Razor Views
    './wwwroot/**/*.html', // Static HTML
    './node_modules/flowbite/**/*.js' // Flowbite components
  ],
  theme: {
    extend: {},
  },
  plugins: [
      require('flowbite/plugin')({// Include Flowbite plugin
          charts: true,
      }),
  ],
}
