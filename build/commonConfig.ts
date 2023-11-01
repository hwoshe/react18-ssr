import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'
// import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import os from 'os'
import { resolve } from 'path'
import TerserPlugin from 'terser-webpack-plugin'
import type { Configuration } from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

const isDevelopmentMode: boolean = process.env.NODE_ENV === 'development'

const mode = isDevelopmentMode ? 'development' : 'production'

export const publicPath: string = isDevelopmentMode ? '/' : './'

const filename = isDevelopmentMode ? '[name].js' : '[name].[chunkhash].js'

export const isAnalyzerMode: boolean = process.env.NODE_ENV === 'analyzer'

const commonConfig: Configuration = {
  cache: {
    allowCollectingMemory: true,
    type: 'filesystem'
  },
  // stats: 'none',
  context: __dirname,
  // infrastructureLogging: {
  //   level: 'none'
  // },
  mode,
  output: {
    assetModuleFilename: 'images/[name][ext]',
    filename,
    path: resolve(__dirname, '../dist'),
    publicPath
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      files: resolve('src')
    })
  ],
  resolve: {
    alias: {
      '@': resolve('./src'),
      '@dir': resolve('./'),
      '@server': resolve('./src/server'),
      '@web': resolve('./src/web')
    },
    extensions: ['.js', '.ts', '.tsx', '.jsx']
  }
}

// if (isAnalyzerMode) {
//   commonConfig.plugins?.push(new BundleAnalyzerPlugin())
// }

// if (!isDevelopmentMode) {
//   commonConfig.optimization = {
//     minimize: true,
//     minimizer: [
//       new CssMinimizerPlugin({
//         minimizerOptions: {
//           // parallel: [
//           //   'default',
//           //   {
//           //     discardComments: {
//           //       removeAll: true
//           //     }
//           //   }
//           // ]
//         },
//         test: /\.css$/g
//       }),
//       new TerserPlugin({
//         extractComments: false,
//         parallel: os.cpus().length - 1,
//         terserOptions: {
//           compress: {
//             arguments: false,
//             dead_code: true,
//             drop_console: true
//           },
//           keep_classnames: true,
//           keep_fnames: true,
//           mangle: true,
//           toplevel: true
//         }
//       })
//     ],
//     runtimeChunk: {
//       name: 'runtime'
//     },
//     splitChunks: {
//       cacheGroups: {
//         commons: {
//           chunks: 'initial',
//           minChunks: 2,
//           name: 'commons'
//         }
//       },
//       chunks: 'async',
//       maxAsyncRequests: 5,
//       maxInitialRequests: 3,
//       minChunks: 1,
//       minSize: {
//         javascript: 100000,
//         style: 100000
//       },
//       name: false
//     }
//   }
// }

export default commonConfig
