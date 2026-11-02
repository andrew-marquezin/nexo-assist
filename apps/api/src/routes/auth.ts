import { Router } from 'express'

export const authRouter = Router()

authRouter.use((_request, response) => {
  response.status(501).json({ message: 'Auth route placeholder' })
})
