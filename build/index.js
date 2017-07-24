const path = require('path')
const getPlugins = require('./getPlugins')
const getRules = require('./getRules')

/**
 * Definição de ambiente.
 * @typedef {('development'|'production')} Environment
 */

/**
 * Obtém a configuração do bundler para o ambiente determinado em "env".
 * @param {('development'|'production')} env
 * @returns {webpack.Configuration}
 */
function getConfiguration (env) {
  const configuration = {
    entry: {
      main: './src',
      vendors: [
        'babel-polyfill'
      ]
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'js/[name].js'
    },
    resolve: {
      extensions: ['.vue', '.js', '.json'],
      alias: {
        '@app': path.resolve(__dirname, '../src/app'),
        '@components': path.resolve(__dirname, '../src/components'),
        '@containers': path.resolve(__dirname, '../src/containers'),
        '@images': path.resolve(__dirname, '../src/assets/images'),
        '@lib': path.resolve(__dirname, '../src/lib'),
        '@store': path.resolve(__dirname, '../src/store'),
        '@styles': path.resolve(__dirname, '../src/assets/styles'),
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
    devServer: {
      contentBase: path.join(__dirname, '../dist'),
      port: process.env.PORT || 9000,
      host: process.env.IP || '127.0.0.1',
      historyApiFallback: true
    },
    module: {
      rules: getRules(env)
    },
    devtool: (env === 'development') ? 'source-map' : false,
    plugins: getPlugins(env)
  }

  return configuration
}

module.exports = getConfiguration
