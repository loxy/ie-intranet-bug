const fs = require('fs');
const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

const DefinePlugin = require('webpack/lib/DefinePlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractFrameworkCSS = new ExtractTextPlugin({ filename: 'framework.css', allChunks: true });
const extractAppSCSS = new ExtractTextPlugin('app.css');

module.exports = function (env) {
  return webpackMerge(commonConfig(), {

    entry: {
      'main': './src/main.ts',
    },

    output: {
      path: helpers.root('dist'),
      filename: '[name].bundle.js',
      sourceMapFilename: '[file].map',
      chunkFilename: '[id].chunk.js',
      library: 'app_[name]',
      libraryTarget: 'var',
    },

    module: {
      rules: [
        {
          test: /\.css$/,
          use: extractFrameworkCSS.extract({
            fallback: 'style-loader',
            use: ['css-loader?sourceMap=true', 'source-map-loader']
          })
        },
        {
          test: /\.scss$/,
          loader: extractAppSCSS.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
          })
        },
      ]
    },

    plugins: [

      // extracts imported CSS files into external stylesheet
      extractFrameworkCSS,
      extractAppSCSS,

      new DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(env.NODE_ENV),
        }
      }),

    ],

    devServer: {
      port: '9080',
      contentBase: helpers.root('dist'),
      publicPath: '/aol/',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'accept, authorization, x-requested-with',
      },
      proxy: {
        '/aol/**': {
          secure: false,
          target: 'https://apa279002.system-a.local',
        },
      }
    },

  });
};
