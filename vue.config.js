const path = require('path')
const name = 'FADI CMS'

module.exports = {
  devServer: {
    port: 1995,
    inline: true,
    hot: true
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'sass',
      patterns: [
        path.resolve(__dirname, 'src/design/styles/_variables.sass'),
        path.resolve(__dirname, 'src/design/styles/_mixins.sass')
      ]
    }
  },
  // https://cli.vuejs.org/guide/webpack.html#chaining-advanced
  // https://medium.com/the-kickstarter/working-with-webpack-on-vue-cli-plugins-typescript-and-sass-ccb34ab04f99
  // https://lmiller1990.github.io/electic/posts/20200406_webpack_for_vue_3.html
  // fixed eslint on save : https://stackoverflow.com/questions/46876709/vue-2-5-template-with-webpack-and-typescript
  // config webpack
  chainWebpack: config => {
    config.module.rule('eslint').use('eslint-loader').options({
      fix: true
    })

    // reset titie webpack
    // https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-plugin
    config
      .plugin('html')
      .tap(args => {
        // https://stackoverflow.com/questions/58207694/favicon-with-webpack-and-vue-cli
        // https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-plugin
        args[0].title = name
        return args
      })

    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])
  }
}
