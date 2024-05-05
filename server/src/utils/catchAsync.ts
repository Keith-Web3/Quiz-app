import { Request, Response, NextFunction } from 'express'
import User from '../models/userModel.js'

const catchAsync = function (
  fn: (
    req: Request & { user: User },
    res: Response,
    next: NextFunction
  ) => Promise<void>
) {
  return (req: Request & { user: User }, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next)
  }
}

export default catchAsync
