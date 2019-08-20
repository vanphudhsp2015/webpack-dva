const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const styleLintPlugin = require('stylelint-webpack-plugin');

const ENV = process.env.NODE_ENV || 'development';
const sourcePath = path.join(__dirname, './');

const moduleMain = {
  rules: [
    {
      test: /\.(ico|jpg|jpeg|png|gif|otf|eot|ttf|woff|svg|less)/,
      loader: ['file-loader'],
    },
    {
      test: /\.(js(x*))$/,
      exclude: /(node_modules)/,
      loader: ['babel-loader', 'eslint-loader'],
    },
    {
      test: /\.css$/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
        },
        {
          loader: 'postcss-loader',
        },
      ],
    },
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[name]__[local]__[hash:base64:5]',
            },
          },
        },
        {
          loader: 'postcss-loader',
        },
        {
          loader: 'sass-loader',
        },
      ],
    },
  ],
};

const resolveMain = {
  extensions: ['*', '.scss', '.js', '.json', '.jsx'],
  modules: [
    path.resolve(__dirname, './node_modules'),
    'node_modules',
  ],
  alias: {
    pages: path.resolve(__dirname, './src/pages'),
    routes: path.resolve(__dirname, './src/routes'),
    layouts: path.resolve(__dirname, './src/layouts'),
    components: path.resolve(__dirname, './src/components'),
    styles: path.resolve(__dirname, './src/assets/styles'),
    actions: path.resolve(__dirname, './src/actions/'),
    constants: path.resolve(__dirname, './src/constants'),
    reducers: path.resolve(__dirname, './src/reducers'),
  },
};

module.exports = () => {
  const isProd = ENV === 'production';

  const plugins = [
    new ExtractTextPlugin({
      filename: isProd ? 'style.[hash].css' : 'style.css',
      disable: false,
      allChunks: true,
    }),
    new Dotenv({
      path: path.join(__dirname, '.env'),
      systemvars: true,
    }),
  ];

  const devTool = isProd ? 'source-map' : 'eval';

  return [
    {
      devtool: devTool,
      context: sourcePath,
      name: 'web',
      output: {
        path: path.join(__dirname, 'build'),
        filename: isProd ? 'bundle.[hash].js' : 'bundle.js',
        publicPath: '/',
      },
      module: moduleMain,
      plugins: plugins.concat(
        new HtmlWebpackPlugin({
          template: path.resolve('./public/', 'index.html'),
          favicon: path.resolve('./public/', 'dva.ico'),
          minify: {
            collapseWhitespace: true,
          },
        }),
        new ManifestPlugin(),
      ),
      performance: isProd && {
        hints: 'warning',
      },
      stats: {
        colors: {
          green: '\u001b[32m',
        },
      },
      node: {
        fs: 'empty',
        // child_process: 'empty',
        global: true,
        process: true,
        Buffer: true,
        __filename: true,
        __dirname: true,
        setImmediate: false,
      },
      resolve: resolveMain,
      devServer: {
        host: 'localhost',
        port: process.env.PORT || 9000,
        contentBase: './',
        historyApiFallback: true,
      },
    },
  ];
};
