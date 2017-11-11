const path = require('path')

const webpack = require('webpack')
const merge = require('webpack-merge')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyPlugin = require('uglifyjs-webpack-plugin')

const envPlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
})

const baseConfig = {
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            ts: 'ts-loader!tslint-loader?failOnHint=true'
          },
          extractCSS: process.env.NODE_ENV === 'production'
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          failOnHint: true
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        }
      }
    ]
  },
  plugins: [
    envPlugin
  ],
  resolve: {
    extensions: ['.vue', '.js', '.ts'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      scss: path.resolve(__dirname, './src/scss')
    }
  }
}

if (process.env.NODE_ENV === 'production') {
  module.exports = merge(baseConfig, {
    entry: ['babel-polyfill', './src/index.ts'],
    module: {
      rules: [
        {
          test: /\.s?css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader!sass-loader'
          })
        },
        {
          test: /\.(ttf|woff)$/,
          loaders: 'file-loader'
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('style.css'),
      new UglifyPlugin()
    ]
  })
} else {
  module.exports = merge(baseConfig, {
    entry: ['./src/index.ts'],
    module: {
      rules: [
        {
          test: /\.s?css$/,
          loaders: 'style-loader!css-loader!sass-loader'
        },
        {
          test: /\.ttf$/,
          loaders: 'url-loader?mimetype=application/octet-stream&name=[path][name].[ext]'
        },
        {
          test: /\.woff$/,
          loaders: 'url-loader?mimetype=application/font-woff&name=[path][name].[ext]'
        }
      ]
    },
    devServer: {
      historyApiFallback: true
    },
    devtool: '#eval-source-map'
  })
}
