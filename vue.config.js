const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
    ? '/buddhist_name/'
    : '/',
  transpileDependencies: true,
  pwa: {
    workboxOptions: {
      exclude: [/\.gitkeep/],
      skipWaiting: true
    }
  }
})
