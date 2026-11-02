import type { NextFunction, Request, Response } from 'express'

export function sessionAuth(_request: Request, _response: Response, next: NextFunction) {
  next()
}
