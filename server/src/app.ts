import express from 'express'
import dotenv from 'dotenv'
import AppError from './utils/appError.js'
import authRoute from './routes/authRoutes.js'
import quizRoute from './routes/quizRoutes.js'
import errorController from './controllers/errorController.js'

dotenv.config({ path: './.env' })

const app = express()

app.use(express.json())
app.use('/v1/api/auth', authRoute)
app.use('/v1/api/quiz', quizRoute)

app.use('*', (req, res, next) => {
  next(new AppError(404, 'This route does not exist'))
})

app.use(errorController)
export default app
