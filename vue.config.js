module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.KOA_PORT || 443}`,
        changeOrigin: true
      }
    }
  }
}
