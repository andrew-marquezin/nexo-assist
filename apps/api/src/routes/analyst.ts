import { Router } from 'express'

export const analystRouter = Router()

analystRouter.use((_request, response) => {
  response.status(501).json({ message: 'Analyst route placeholder' })
})
