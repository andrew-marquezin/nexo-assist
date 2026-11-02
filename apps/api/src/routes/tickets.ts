import { Router } from 'express'

export const ticketsRouter = Router()

ticketsRouter.use((_request, response) => {
  response.status(501).json({ message: 'Tickets route placeholder' })
})
