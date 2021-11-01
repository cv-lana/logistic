const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CopyPlugin = require("copy-webpack-plugin");

const mode = process.env.NODE_ENV;

const isDev = mode === 'development';
const generateFilename = ext => isDev ?
  `[name].${ext}` :
  `[name].[contenthash].${ext}`;

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './index.js',
  },
  output: {
    filename: `./js/${generateFilename('js')}`,
    path: path.resolve(__dirname, 'build'),
    clean: true,
    environment: {
      arrowFunction: false
    },
    assetModuleFilename: '[path][name][ext]',
  },
  mode,
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: !isDev,
      }
    }),
    new MiniCssExtractPlugin({
      filename: `./css/${generateFilename('css')}`,
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: 'favicon',
    //       to: 'favicon'
    //     }
    //   ]
    // })
  ],
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            }
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.html$/i,
        use: ['html-loader']
      }
    ]
  },
  devServer: {
    static: './build',
    open: true,
    port: 3000,
    hot: true,
    compress: true,
    client: {
      overlay: true,
    },
    devMiddleware: {
      writeToDisk: true,
    },
    historyApiFallback: true,
  },
  devtool: isDev && 'source-map'
}