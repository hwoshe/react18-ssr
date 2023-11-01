import { Configuration, optimize } from 'webpack'
import { merge } from 'webpack-merge'
import nodeExternals from 'webpack-node-externals'
import WebpackBar from 'webpackbar'

import commonConfig from './commonConfig'

const entry = {
  server: '../src/web/entry.server.tsx'
}

const barConfig = {
  basic: false,
  color: '#ffac00',
  name: 'Server',
  profile: false,
  reporters: ['fancy']
}

const serverConfig: Configuration = {
  devtool: false,
  entry,
  externals: nodeExternals(),
  externalsPresets: { node: true },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        test: /\.(js|jsx|ts|tsx)$/
      },
      {
        test: /\.css$/,
        use: [
          'isomorphic-style-loader-react18',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                auto: true,
                localIdentName: '[local]__[hash:base64:5]'
              }
            }
          },
          'postcss-loader'
        ]
      },
      {
        generator: {
          emit: false
        },
        test: /\.(png|jpg|jpeg|gif|eot|woff|woff2|ttf|svg|otf|webp)$/,
        type: 'asset/resource'
      }
    ]
  },
  name: 'server',
  output: {
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new WebpackBar(barConfig),
    new optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ],
  target: 'node14',
  watch: true
}

export default merge(commonConfig, serverConfig)
