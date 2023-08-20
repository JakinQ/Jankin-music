const { defineConfig } = require('@vue/cli-service')
const { VantResolver } = require('unplugin-vue-components/resolvers')
const ComponentsPlugin = require('unplugin-vue-components/webpack')

module.exports = defineConfig({
  chainWebpack: config => {
    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main.prod.js')
      config.set('externals', {
        // vue: 'Vue',
        // 'vue-router': 'VueRouter',
        // axios: 'axios',
        vant: 'vant'

      })
    })
    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main.dev.js')
    })
  },

  transpileDependencies: true,

  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()]
      })

    ]
  }
  // devServer: {
  //   historyApiFallback: true,
  //   allowedHosts: 'all',
  //   client: {
  //     webSocketURL: 'ws://0.0.0.0:8080/ws'
  //   }
  //   // disableHostCheck: true,
  //   // 让手机也可以用
  //   // host: '10.1.1.130', // ip
  //   // port: 8080, // 设置端口号
  //   // https: false, // https:{type:Boolean}
  //   // open: false, // 配置自动启动浏览器
  //   // proxy: null // 设置代理
  // },
  // proServer: {
  //   historyApiFallback: true,
  //   allowedHosts: 'all',
  //   client: {
  //     webSocketURL: 'ws://0.0.0.0:8080/ws'
  //   },
  //   disableHostCheck: true
  //   // 让手机也可以用
  //   // host: '10.1.1.130', // ip
  //   // port: 8080, // 设置端口号
  //   // https: false, // https:{type:Boolean}
  //   // open: false, // 配置自动启动浏览器
  //   // proxy: null // 设置代理
  // }
})
