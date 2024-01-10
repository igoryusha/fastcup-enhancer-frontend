import path from 'path';
import webpack from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

// @ts-ignore
import StylexPlugin from '@ladifire-opensource/stylex-webpack-plugin';

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const config: webpack.Configuration = {
  mode: isDev ? 'development' : 'production',

  target: isDev ? 'web' : 'browserslist',

  devtool: isDev ? 'cheap-module-source-map' : false,

  entry: {
    content: './src/content/content.tsx',
    popup: './src/popup/popup.tsx',
    background: './src/background/background.ts',
  },

  output: {
    filename: '[name].js',
    path: path.resolve('dist'),
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@popup': path.resolve(__dirname, 'src', 'popup'),
      '@content': path.resolve(__dirname, 'src', 'content'),
      '@': path.resolve(__dirname, 'src'),
    },
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: `./src/popup/popup.html`,
      minify: {
        collapseWhitespace: isProd,
      },
      chunks: ['popup'],
      filename: 'popup.html',
    }),

    new CopyWebpackPlugin({
      patterns: ['./src/manifest.json'],
    }),

    new MiniCssExtractPlugin(),

    new webpack.DefinePlugin({
      'process.env.API_BASE_URL': isDev
        ? "'http://localhost:3000'"
        : "'http://fastcup-extension.igoryusha.love'",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },

      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'ts-loader',
          // {
          //   loader: StylexPlugin.loader,

          //   options: {
          //     inject: false,
          //   },
          // },
        ],
      },
    ],
  },
};

export default config;
