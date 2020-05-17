import { Router as ExpressRouter } from 'express'
import api from './api/router'

const Router: ExpressRouter = ExpressRouter()

// http://url/api/v1
Router.use('/v1', api)

export default Router
