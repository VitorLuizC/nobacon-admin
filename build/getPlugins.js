const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const { DefinePlugin, optimize } = require('webpack')
const { UglifyJsPlugin, CommonsChunkPlugin } = optimize
const ExtractTextPlugin = require('extract-text-webpack-plugin')

/**
 * Definição de ambiente.
 * @typedef {('development'|'production')} Environment
 */

/**
 * Obtém os plugins para o ambiente definido em "env".
 * @param {Environment} env
 * @returns {Array.<webpack.Plugin>}
 */
function getPlugins (env) {
  const htmlMinifierConfig = {
    html5: true,
    removeComments: true,
    keepClosingSlash: false,
    collapseWhitespace: true,
    removeAttributeQuotes: true,
    collapseBooleanAttributes: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true
  }

  const plugins = [
    new ExtractTextPlugin('css/style.css'),
    new HtmlPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html'),
      minify: env === 'development' ? false : htmlMinifierConfig
    })
  ]

  if (env !== 'development') {
    plugins.push(
      new DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new CommonsChunkPlugin({
        name: 'vendors',
        minChunks: 2
      }),
      new UglifyJsPlugin()
    )
  }

  return plugins
}

module.exports = getPlugins
