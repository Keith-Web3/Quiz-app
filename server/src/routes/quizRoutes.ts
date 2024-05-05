import express from 'express'
import {
  createQuiz,
  deleteQuiz,
  getQuiz,
  getQuizzes,
} from '../controllers/quizController.js'
import { protect } from '../controllers/authController.js'

const router = express.Router()

router.use(protect)

router.route('/').get(getQuizzes).post(createQuiz)
router.route('/:quizId').get(getQuiz).delete(deleteQuiz)

export default router
