import express from 'express'
import dotenv from 'dotenv'
import xss from 'xss-clean'
import helmet from 'helmet'
import sanitize from 'express-mongo-sanitize'
import rateLimit from 'express-rate-limit'
import cookieParser from 'cookie-parser'

import AppError from './utils/appError.js'
import authRoute from './routes/authRoutes.js'
import quizRoute from './routes/quizRoutes.js'
import questionRoute from './routes/questionRoutes.js'
import errorController from './controllers/errorController.js'

dotenv.config({ path: './.env' })

const app = express()

app.use(helmet())
app.use(xss())
app.use(sanitize())
app.use(cookieParser())

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this user. Please try again later.',
})

app.use('/v*/api', limiter)

app.use(express.json({ limit: '10kb' }))
app.use('/v1/api/auth', authRoute)
app.use('/v1/api/quiz', quizRoute)
app.use('/v1/api/question', questionRoute)

app.use('*', (req, res, next) => {
  next(new AppError(404, 'This route does not exist'))
})

app.use(errorController)
export default app
