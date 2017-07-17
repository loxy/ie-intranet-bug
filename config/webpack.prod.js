const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

const DefinePlugin = require('webpack/lib/DefinePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const IgnorePlugin = require('webpack/lib/IgnorePlugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

module.exports = function (env) {
  return webpackMerge(commonConfig(), {

    entry: {
      'vendor': [
        'angular',
        'angular-messages',
        'angular-mocks',
        'angular-route',
        'angular-sanitize',
        'angular-animate',
        'angular-ui-bootstrap',
        'core-js',
        'lodash'
      ],
      'main': './src/main.ts',
    },

    output: {
      path: helpers.root('dist'),
      filename: '[name].[chunkhash].bundle.js',
      sourceMapFilename: '[file].map',
      chunkFilename: '[id].[chunkhash].chunk.js'
    },

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader?sourceMap=true', 'source-map-loader']
          })
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
          })
        },
      ]
    },

    plugins: [

      new ExtractTextPlugin('[name].[contenthash].css'),

      new WebpackMd5Hash(),

      new DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(env.NODE_ENV),
        }
      }),

      new CommonsChunkPlugin({
        names: ['vendor']
      }),

      new CircularDependencyPlugin({
        exclude: /a\.js|node_modules/,
        failOnError: false
      }),

    ]

  });
};
