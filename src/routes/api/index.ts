import { Request, Response } from 'express'

class Handler {

  test (req: Request, res: Response) {

    res.status(200).json({ success: true, message: 'It works' })

  }

}

export default new Handler()
