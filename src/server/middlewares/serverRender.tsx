import type { Response } from 'express'
import StyleContext from 'isomorphic-style-loader-react18/StyleContext'
import { resolve } from 'path'
import React, { createElement } from 'react'
import { renderToPipeableStream } from 'react-dom/server'

import htmlTemplate from './htmlTemplate'

const EntryServer = require(resolve(process.cwd(), './dist/server.js')).default

const ABORT_DELAY = 100000

// const ssrMode = process.env.SSR_MODE || 'stream'

const Css = new Set()

const serverRender = (url: string, res: Response, assetScript = '') => {
  let didError = false

  const insertCss = (...styles) => {
    styles.forEach((style) =>
      // eslint-disable-next-line no-underscore-dangle
      Css.add(style._getCss())
    )
  }

  const serverJsx = createElement(() => EntryServer({ location: url }))

  const assetStyle = `<style>${[...Css].join('')}</style>`

  const { header, footer } = htmlTemplate({
    assetScript,
    assetStyle
  })

  const { pipe, abort } = renderToPipeableStream(
    <StyleContext.Provider value={{ insertCss }}>
      {serverJsx}
    </StyleContext.Provider>,
    {
      bootstrapScripts: ['./main.js'],
      onError(err) {
        console.log('err', err)
        didError = true
      },
      onShellReady() {
        res.statusCode = didError ? 500 : 200
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.write(header)
        pipe(res)
        res.write(footer)
      }
    }
  )
  setTimeout(() => {
    abort()
  }, ABORT_DELAY)
}

export default serverRender
