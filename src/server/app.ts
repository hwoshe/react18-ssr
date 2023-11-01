// import chalk from 'chalk'
import compression from 'compression'
import express, { NextFunction, Request, Response } from 'express'
import { resolve } from 'path'

import serverRender from './middlewares/serverRender'

const assetScript = ''
const app = express()

app.use(compression())
app.use(express.static(resolve(process.cwd(), './dist')))
app.all('*', (req, res: Response, next: NextFunction) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
  )
  res.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  next()
})

app.get('/*', async (req: Request, res: Response) => {
  serverRender(req.url, res, assetScript)
})

// app.use(errorRouter)
app.listen(4000)
