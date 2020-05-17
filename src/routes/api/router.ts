import { Router as ExpressRouter } from 'express'
import handler from './index'

const api: ExpressRouter = ExpressRouter()

api.get('/test', handler.test)

export default api
