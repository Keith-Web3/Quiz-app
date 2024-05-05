import Quiz from '../models/quizModel.js'
import catchAsync from '../utils/catchAsync.js'
import extract from '../utils/extract.js'

export const createQuiz = catchAsync(async function (req, res, next) {
  const user = req.user

  const quizData = extract(req.body, 'name', 'description')
  quizData.author = user.id

  const quiz = await Quiz.create(quizData)

  res.status(201).json({
    status: 'success',
    data: {
      quiz,
    },
  })
})

export const getQuizzes = catchAsync(async function (req, res, next) {
  const quizzes = await Quiz.find()

  res.status(200).json({
    status: 'success',
    data: {
      quizzes,
    },
  })
})
