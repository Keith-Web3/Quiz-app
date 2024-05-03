import express, { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import AppError from './utils/appError.js'
import authRoute from './routes/authRoutes.js'

dotenv.config({ path: './.env' })

const app = express()

app.use(express.json())
app.use('/v1/auth', authRoute)

app.use('*', (req, res, next) => {
  next(new AppError(404, 'This route does not exist'))
})

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  })
})
export default app
