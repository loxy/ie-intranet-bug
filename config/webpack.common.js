const webpack = require('webpack');
const helpers = require('./helpers');

const AssetsPlugin = require('assets-webpack-plugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const METADATA = {
  baseUrl: '/aol/',
  port: '9080',
  isDevServer: helpers.isWebpackDevServer()
};

module.exports = function () {
  return {

    devtool: 'source-map',

    resolve: {
      extensions: ['.ts', '.js', '.json'],
      modules: [helpers.root('src'), helpers.root('node_modules')],

      alias: {
        angular: helpers.root('node_modules/angular/angular.min.js'),
        'angular-animate': helpers.root('node_modules/angular-animate/angular-animate.min.js'),
        'angular-messages': helpers.root('node_modules/angular-messages/angular-messages.min.js'),
        'angular-route': helpers.root('node_modules/angular-route/angular-route.min.js'),
        'angular-sanitize': helpers.root('node_modules/angular-sanitize/angular-sanitize.min.js'),
        lodash: helpers.root('node_modules/lodash/lodash.min.js'),
      }
    },

    module: {

      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
          exclude: [helpers.root('node_modules/@uirouter')]
        },

        // Add "module.exports = angular" to the end of the file
        {
          test: helpers.root('node_modules/angular/angular.min.js'),
          use: [
            {
              loader: 'exports-loader',
              options: 'angular'
            }
          ]
        },

        {
          test: /\.ts$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                plugins: [
                  ['angularjs-annotate', {'explicitOnly': true}]
                ]
              }
            },
            {
              loader: 'ts-loader',
              options: {
                configFileName: 'tsconfig.webpack.json'
              }
            }
          ],
          exclude: [/\.(spec|e2e)\.ts$/]
        },


        // JSON
        {
          test: /\.json$/,
          use: 'json-loader'
        },

        // Angular templates
        {
          test: /\.ngtpl\.html$/,
          use: [
            {
              loader: 'ngtemplate-loader',
              options: {
                relativeTo: helpers.root()
              }
            },
            {
              loader: 'html-loader',
              options: {
                minimize: true
              }
            }
          ],
          exclude: [helpers.root('src/index.html'), helpers.root('src/iframe.html')]
        },

        // HTML
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                minimize: true
              }
            }
          ],
          exclude: [helpers.root('src/index.html'), /\.ngtpl/, helpers.root('src/iframe.html')]
        },

        // Images
        {
          test: /\.(jpg|png|gif|svg)$/,
          use: 'file-loader?name=assets/[name].[ext]'
        },

        // Fonts
        {
          test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
          use: 'url-loader?limit=10000&name=fonts/[name].[ext]&mimetype=application/font-woff'
        },
        {
          test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
          use: 'url-loader?limit=10000&name=fonts/[name].[ext]&mimetype=application/font-woff'
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          use: 'url-loader?limit=10000&name=fonts/[name].[ext]&mimetype=application/octet-stream'
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          use: 'file-loader?name=fonts/[name].[ext]'
        },
        {
          test: /(ionicons|glyphicons)+.*\.svg(\?v=\d+\.\d+\.\d+)?$/,
          use: 'url-loader?limit=10000&name=fonts/[name].[ext]&mimetype=image/svg+xml'
        },

      ],

    },

    plugins: [

      new AssetsPlugin({
        path: helpers.root('dist'),
        filename: 'webpack-assets.json',
        prettyPrint: true
      }),

      new CopyWebpackPlugin([
        {from: 'src/assets', to: 'assets'},
      ], {
        ignore: [
          '.gitkeep'
        ],
      }),

      new HtmlWebpackPlugin({
        template: 'src/index.html',
        chunksSortMode: 'dependency',
        metadata: METADATA,
        inject: 'head'
      }),

      new HtmlWebpackPlugin({
        template: 'src/iframe.html',
        filename: 'iframe-content.html',
        chunksSortMode: 'dependency',
        metadata: METADATA,
        inject: 'head'
      }),

      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer'
      }),

    ],

  };
};
