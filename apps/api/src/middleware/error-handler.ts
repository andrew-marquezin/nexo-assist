import type { NextFunction, Request, Response } from 'express'
import { AppError } from '../lib/errors.js'

export function errorHandler(error: unknown, _request: Request, response: Response, _next: NextFunction) {
  if (error instanceof AppError) {
    response.status(error.statusCode).json({ error: error.message })
    return
  }

  response.status(500).json({ error: 'Internal server error' })
}
