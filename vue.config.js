// @ts-check
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

/** @type {import('@vue/cli-service/types/ProjectOptions').ProjectOptions} */
module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  // assetsDir: 'static',
  chainWebpack: config => {
    config.module
      .rule('ts')
      .test(/\.ts$/)
      .exclude.add(/node_modules|\.d\.ts$/)
      .end()
      .use('ts-loader')
      .loader('ts-loader')
      .tap(() => {
        const options = {
          transpileOnly: true,
          onlyCompileBundledFiles: true,
          happyPackMode: true,
          appendTsSuffixTo: [/\.vue$/],
        }
        return options
      })
    config.module
      .rule('ignore')
      .test(/\.d\.ts$|\.md$/)
      .use('ignore-loader')
      .loader('ignore-loader')
      .end()
  },
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      alias: {
        renderer: 'src',
        assets: '@/assets',
        lin: '@/lin',
      },
      extensions: ['.js', '.json', '.vue', '.scss', '.html'],
    },
  },
  css: {
    loaderOptions: {
      /** @type {import('sass-loader').Options} */
      sass: {
        prependData: `@import "@/assets/style/shared.scss";`,
      },
    },
  },
  devServer: {},
  // node_modules依赖项es6语法未转换问题
  transpileDependencies: ['vuex-persist'],
}
