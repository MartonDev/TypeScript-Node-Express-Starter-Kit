import { Request, Response, NextFunction } from 'express'

import HttpException from './HttpException'
import Logger from '../logger'

class ErrorHandler {

  //handle all errors
  errorHandler (err: HttpException, req: Request, res: Response, next: NextFunction) {

    Logger.error(err)

    if(err.status) {

      res.status(err.status).json({ 'message': err.message })

    }else {

      res.status(500).json({ message: 'Internal server error' })

    }

  }

  //404 error
  nullRoute (req: Request, res: Response, next: NextFunction) {

    if(req.accepts('html') && req.method.toLowerCase() == 'get') {

      //in a vue or react app, we redirect to a custom 404 route, defined in the front-end
      //res.redirect(`/404`)
      res.send('Not found')
      return

    }

    res.status(404)

    if(req.accepts('json')) {

      res.send({ error: 'Not found' })
      return

    }

    res.type('txt').send('Not found')

  }

}

export default new ErrorHandler()
