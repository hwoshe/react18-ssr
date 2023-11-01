import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin, {
  loader as _loader
} from 'mini-css-extract-plugin'
import { resolve } from 'path'
import type { Configuration } from 'webpack'
import { DefinePlugin, HotModuleReplacementPlugin } from 'webpack'
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'
import { WebpackManifestPlugin } from 'webpack-manifest-plugin'
import { merge } from 'webpack-merge'
import WebpackBar from 'webpackbar'

import commonConfig from './commonConfig'
import { webExternals } from './index'

const isDevelopmentMode: boolean = process.env.NODE_ENV === 'development'

const barConfig = {
  basic: false,
  color: '#00b400',
  name: 'Client',
  profile: false,
  reporters: ['fancy']
}

const devServer: DevServerConfiguration = {
  compress: true,
  devMiddleware: {
    writeToDisk: (filePath) => {
      return /^((?!hot-update).)*$/.test(filePath)
    }
  },
  historyApiFallback: true,
  port: 3000,
  // port: 8010,
  // host: true,
  static: resolve(__dirname, '../dist')
}

const isSsrMode: boolean = process.env.SSR_MODE !== 'none'

const entry = { main: '../src/web/entry.client.tsx' }

const devtool = isDevelopmentMode ? 'source-map' : false

const cssLoaders = [
  'isomorphic-style-loader-react18',
  // isDevelopmentMode ? _loader : 'style-loader',
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

const webConfig: Configuration = {
  devServer,
  devtool,
  entry,
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'swc-loader',
        test: /\.(js|jsx|ts|tsx)$/
      },
      {
        test: /\.css$/,
        use: cssLoaders
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|woff|woff2|ttf|svg|otf|webp)$/,
        type: 'asset/resource'
      }
    ]
  },
  name: 'web',
  output: {
    chunkFilename: '[name].chunk.js'
  },
  plugins: [
    new WebpackBar(barConfig),
    new DefinePlugin({
      IsSSRMode: isSsrMode
    }),
    new MiniCssExtractPlugin({
      chunkFilename: isDevelopmentMode
        ? 'styles/[name].css'
        : 'styles/[name].[contenthash:5].css',
      filename: isDevelopmentMode
        ? 'styles/[name].css'
        : 'styles/[name].[contenthash:5].css',
      ignoreOrder: true
    })
  ],
  target: ['web', 'es2015'],
  watch: true
}

if (isDevelopmentMode) {
  webConfig.plugins?.push(new ReactRefreshWebpackPlugin())
} else {
  webConfig.externals = webExternals
}

if (isSsrMode) {
  webConfig.plugins?.push(
    new WebpackManifestPlugin({
      isAsset: true,
      isChunk: true,
      isInitial: true,
      isModuleAsset: true
    })
  )
  if (isDevelopmentMode) {
    webConfig.plugins?.push(new HotModuleReplacementPlugin())
  }
} else {
  webConfig.plugins?.push(
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '../public/index.template.html')
    })
  )
}

export default merge(commonConfig, webConfig)
