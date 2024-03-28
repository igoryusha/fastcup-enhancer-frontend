import path from 'path';
import webpack from 'webpack';
import Dotenv from 'dotenv-webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ZipPlugin from 'zip-webpack-plugin';

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const config: webpack.Configuration = {
  mode: isDev ? 'development' : 'production',

  // target: isDev ? 'web' : 'browserslist',

  devtool: isDev ? 'cheap-module-source-map' : false,

  entry: {
    content: './src/content/index.tsx',
    popup: './src/popup/index.tsx',
    // background: './src/background/index.ts',
  },

  output: {
    filename: '[name].js',
    path: path.resolve('dist'),
    clean: true,
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@public': path.resolve(__dirname, 'public'),
      '@shared': path.resolve(__dirname, 'src', 'shared'),
      '@content': path.resolve(__dirname, 'src', 'content'),
      '@popup': path.resolve(__dirname, 'src', 'popup'),
    },
  },

  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: './src/popup/index.html',
      minify: {
        collapseWhitespace: isProd,
      },
      chunks: ['popup'],
      filename: 'popup.html',
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: './public',
        },
      ],
    }),

    new MiniCssExtractPlugin(),

    new Dotenv({
      path: `.${isDev ? 'dev' : 'prod'}.env`,
    }),

    new ZipPlugin({
      filename: 'dist.zip',
    }) as any,
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path]--[local]',
                auto: /local\.css$/,
                mode: 'local',
              },
            },
          },
          'postcss-loader',
        ],
      },

      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },

      {
        test: /\.(j|t)s(x?)$/,
        exclude: /node_modules/,
        use: ['swc-loader', 'ts-loader'],
      },
    ],
  },
};

export default config;
