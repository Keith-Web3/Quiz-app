import express from 'express'
import { createQuiz, getQuizzes } from '../controllers/quizController.js'
import { protect } from '../controllers/authController.js'

const router = express.Router()

router.use(protect)

router.route('/').get(getQuizzes).post(createQuiz)

export default router
