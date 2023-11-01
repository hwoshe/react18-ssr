import shell from 'shelljs'
import { promisify } from 'util'
import type { Configuration, Stats } from 'webpack'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

import serverConfig from './serverConfig'
import webConfig from './webConfig'

const callbackWebpack = (err, stats) => {
  if (err) {
    console.error(err.stack || err)
    if (err.details) {
      console.error(err.details)
    }
    process.exit(1)
    return
  }
  const info = stats.toJson()
  const statusJson = stats.toJson({ assets: true })
  const assets = statusJson?.assets?.reduce((item, { name }) => {
    item[name] = `/${name}`
    return item
  }, {})
  console.log('🚀 ~ file: service.js ~ assets', assets)

  if (stats.hasErrors()) {
    console.log('Finished running webpack with errors.')
    info?.errors?.forEach((e) => console.error(e))
    process.exit(1)
  } else {
    console.log('success')
  }
}

const webCompiler = async (): Promise<string> => {
  const result: string = await new Promise((resolve) => {
    const compiler = webpack(webConfig)
    const devServerOptions = { ...webConfig.devServer, open: false }
    const server = new WebpackDevServer(devServerOptions, compiler)
    server.startCallback()
    compiler.hooks.done.tap('DonePlugin', () => {
      resolve('web success')
    })
  })
  return result
}

const serverCompiler = async (): Promise<string> => {
  const result: string = await new Promise((resolve) => {
    const compiler = webpack(serverConfig, callbackWebpack)
    compiler.hooks.done.tap('DonePlugin', () => {
      resolve('server success')
    })
  })
  return result
}

const webpackStart = async () => {
  const res = await Promise.all([webCompiler(), serverCompiler()])
  if (res.length === 2) {
    shell.exec('npm run server', (code: number, stdout: any, stderr: any) => {
      console.log('Exit code:', code)
      console.log('Program output:', stdout)
      console.log('Program stderr:', stderr)
      // if (code === 0) {
      //   console.log('success')
      //   // do something
      // }
    })
  }
}

webpackStart()
