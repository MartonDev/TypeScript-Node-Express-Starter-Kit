import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'

import Config from './config.json'

import Logger from './src/logger'
import ErrorHandler from './src/errors'
import Router from './src/routes'

//the express app itself
const app: express.Application = express()

//session
app.set('trust proxy', 1)
app.use(session({

  secret: 'RANDOM_SECRET',
  resave: false,
  saveUninitialized: true,
  //cookie: { secure: true } //use when https:// is active

}))

//routing
app.use(express.static('./public', { extensions: ['html'] }))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', Router)
app.use(ErrorHandler.errorHandler)
app.use(ErrorHandler.nullRoute)

Logger.info('Starting express server...')

app.listen(Config.port, () => {

  Logger.info(`Server started on port ${Config.port}`)

})
