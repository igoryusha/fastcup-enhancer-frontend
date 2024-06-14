import path from 'path';
import webpack from 'webpack';
import Dotenv from 'dotenv-webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ZipPlugin from 'zip-webpack-plugin';

const NODE_ENV = process.env.NODE_ENV;

if (!NODE_ENV) {
  throw new Error('NODE_ENV must be presentend');
}

const knowNodeEnvs: Partial<Record<string, string>> = {
  'development': 'development',
  'test-production': 'test-production',
  'production': 'production',
};

if (!knowNodeEnvs[NODE_ENV]) {
  throw new Error('NODE_ENV is unkown');
}

const isDev = NODE_ENV !== knowNodeEnvs.production;
const isProd = !isDev;

const config: webpack.Configuration = {
  mode: isDev ? 'development' : 'production',

  devtool: isDev ? 'inline-source-map' : false,

  entry: {
    content: './src/content/index.ts',
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
        {
          from: './src/_locales',
          to: '_locales',
        },
        {
          from: './src/manifest.json',
          transform(content) {
            if (isProd) {
              return content;
            }

            const manifest = JSON.parse(content.toString());

            manifest.name = `[${NODE_ENV}] ${manifest.name}`;

            return Buffer.from(JSON.stringify(manifest));
          },
        },
      ],
    }),

    new Dotenv({
      path: `.env/.${NODE_ENV}.env`,
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
          {
            loader: 'style-loader',
            options: {
              insert: 'html',
            },
          },
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
