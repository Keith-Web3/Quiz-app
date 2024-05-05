import express from 'express'
import { addQuestions, getQuestions } from '../controllers/quizController.js'

const router = express.Router({ mergeParams: true })

router.route('/').get(getQuestions).post(addQuestions)
export default router
