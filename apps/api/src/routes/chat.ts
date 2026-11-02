import { Router } from 'express'

export const chatRouter = Router()

chatRouter.use((_request, response) => {
  response.status(501).json({ message: 'Chat route placeholder' })
})
