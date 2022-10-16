const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniExtractPlugin = require('mini-css-extract-plugin')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')

const os = require('os')
const threads = os.cpus().length

const isProduction = process.env.NODE_ENV === 'production'

function getStyleLoader(arg) {
  return [
    isProduction ? MiniExtractPlugin.loader : 'style-loader',
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['postcss-preset-env'],
        },
      },
    },
    arg && {
      loader: arg,
    },
  ].filter(Boolean)
}

module.exports = {
  entry: {
    index: path.join(__dirname, '../src/index.tsx'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              exclude: /(node_modules|dist)/,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: getStyleLoader(),
      },
      {
        test: /\.s[ac]ss$/,
        use: getStyleLoader('sass-loader'),
      },
      {
        test: /\.(gif|png|jpe?g|webp|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
        generator: {
          filename: 'static/images/[hash:10][ext]',
        },
      },
      {
        test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
        type: 'asset/resource',
        generator: {
          // 输出图片名称
          //[hash:10]取文件前10位
          filename: 'static/media/[hash:10][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public/index.html'),
      filename: 'index.html',
    }),
    new ESLintWebpackPlugin({
      context: path.resolve(__dirname, '../src'),
      cache: true,
      cacheLocation: path.resolve(__dirname, '../node_modules/.cache/eslintcache'),
      threads,
      exclude: 'node_modules',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          name: 'vendors',
          minChunks: 1,
          chunks: 'initial',
          minSize: 0,
          priority: 1,
        },
        commons: {
          name: 'commons',
          minChunks: 2,
          chunks: 'initial',
          minSize: 0,
        },
      },
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}.[contenthash:10].js`,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    modules: [path.resolve(__dirname, '../node_modules')],
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
}
