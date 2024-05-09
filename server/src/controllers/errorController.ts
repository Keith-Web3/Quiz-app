import { NextFunction, Request, Response } from 'express'
import AppError from '../utils/appError.js'
import { MongooseError } from 'mongoose'

export default async function (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.name === 'MongoServerError' && err.code === 11000) {
    const duplicateField = Object.keys(err.errorResponse.keyValue)[0]
    return res.status(401).json({
      status: 'failed',
      message: `Duplicate ${duplicateField}. Please use another value!`,
    })
  }
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
