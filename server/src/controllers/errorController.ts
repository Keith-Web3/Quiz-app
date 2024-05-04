import { NextFunction, Request, Response } from 'express'
import AppError from '../utils/appError.js'

export default async function (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err)
  if (!err.isOperational) {
    return res.status(500).json({
      message: 'Something went really wrong',
    })
  }
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  })
}
