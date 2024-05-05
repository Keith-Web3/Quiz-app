import express from 'express'
import { createQuiz } from '../controllers/quizController.js'
import { protect } from '../controllers/authController.js'

const router = express.Router()

router.use(protect)

router.route('/').post(createQuiz)

export default router
