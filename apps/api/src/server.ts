import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { env } from './config/env.js'
import { logger } from './lib/logger.js'
import { errorHandler } from './middleware/error-handler.js'
import { apiRouter } from './routes/index.js'

export function createApp() {
  const app = express()

  app.use(express.json())
  app.use('/api', apiRouter)

  if (env.NODE_ENV === 'production') {
    const currentDirectory = path.dirname(fileURLToPath(import.meta.url))
    const webDistPath = path.resolve(currentDirectory, '../../../web/dist')
    const webIndexHtml = fs.readFileSync(path.join(webDistPath, 'index.html'), 'utf-8')

    app.use(express.static(webDistPath))
    app.use((_request, response) => {
      response.type('html').send(webIndexHtml)
    })
  }

  app.use(errorHandler)

  return app
}

const isMain = process.argv[1] ? fileURLToPath(import.meta.url) === path.resolve(process.argv[1]) : false

if (isMain) {
  const app = createApp()
  app.listen(env.PORT, () => {
    logger.info(`API running on port ${env.PORT}`)
  })
}
