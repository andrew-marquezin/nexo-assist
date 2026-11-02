import { Router } from 'express'
import { analystRouter } from './analyst.js'
import { authRouter } from './auth.js'
import { chatRouter } from './chat.js'
import { healthRouter } from './health.js'
import { ticketsRouter } from './tickets.js'

export const apiRouter = Router()

apiRouter.use(healthRouter)
apiRouter.use('/auth', authRouter)
apiRouter.use('/chat', chatRouter)
apiRouter.use('/tickets', ticketsRouter)
apiRouter.use('/analyst', analystRouter)
