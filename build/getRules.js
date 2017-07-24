const poststylus = require('poststylus')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

/**
 * Definição de ambiente.
 * @typedef {('development'|'production')} Environment
 */

/**
 * Obtém as regras(rules) para o ambiente determinado em "env".
 * @param {Environment} env
 * @returns {Array.<webpack.Rule>}
 */
function getRules (env) {
  const styleLoaders = [
    {
      loader: 'css-loader',
      options: {
        minimize: env === 'development' ? false : {
          autoprefixer: false /**
                               * Impede que o cssnano imbutido no css-loader
                               * sobrescreva os prefixos configurados.
                               **/
        }
      }
    },
    {
      loader: 'stylus-loader',
      options: {
        use: poststylus([
          autoprefixer({
            browsers: ['> 1%, IE >= 11']
          })
        ])
      }
    }
  ]

  const imageLoaders = [
    {
      loader: 'file-loader',
      options: {
        name: 'img/[name].[ext]'
      }
    }
  ]

  if (env !== 'development') {
    // imageLoaders.push({
    //   loader: 'image-webpack-loader',
    //   options: {
    //     gifsicle: {
    //       interlaced: false
    //     },
    //     optipng: {
    //       optimizationLevel: 7
    //     },
    //     progressive: true
    //   }
    // })
  }

  const rules = [
    {
      test: /\.(js|vue)$/,
      exclude: /node_modules/,
      enforce: 'pre',
      loader: 'eslint-loader'
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    },
    {
      test: /\.vue$/,
      exclude: /node_modules/,
      use: {
        loader: 'vue-loader',
        options: {
          loaders: {
            stylus: ExtractTextPlugin.extract({
              publicPath: '../',
              use: styleLoaders
            })
          }
        }
      }
    },
    {
      test: /\.(png|jpe?g)$/,
      use: imageLoaders
    }
  ]

  return rules
}

module.exports = getRules
