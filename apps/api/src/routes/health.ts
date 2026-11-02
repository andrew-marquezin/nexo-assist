import { healthResponseSchema } from '@nexo-assist/shared'
import { Router } from 'express'

export const healthRouter = Router()

healthRouter.get('/health', (_request, response) => {
  response.json(healthResponseSchema.parse({ status: 'ok' }))
})
