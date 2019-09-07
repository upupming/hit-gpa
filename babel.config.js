const removeConsolePlugin = []
if (process.env.NODE_ENV === 'production') {
  removeConsolePlugin.push('transform-remove-console')
}

module.exports = {
  presets: [
    '@vue/app'
  ],
  // https://stackoverflow.com/a/53192346/8242705
  plugins: removeConsolePlugin
}
