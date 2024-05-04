import express from 'express'
import dotenv from 'dotenv'
import AppError from './utils/appError.js'
import authRoute from './routes/authRoutes.js'
import errorController from './controllers/errorController.js'

dotenv.config({ path: './.env' })

const app = express()

app.use(express.json())
app.use('/v1/auth', authRoute)

app.use('*', (req, res, next) => {
  next(new AppError(404, 'This route does not exist'))
})

app.use(errorController)
export default app
