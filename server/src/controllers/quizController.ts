import Question from '../models/questionModel.js'
import Quiz from '../models/quizModel.js'
import AppError from '../utils/appError.js'
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

export const getQuiz = catchAsync(async function (req, res, next) {
  const { quizId } = req.params

  const quiz = await Quiz.findById(quizId)

  res.status(200).json({
    status: 'success',
    data: {
      quiz,
    },
  })
})

export const deleteQuiz = catchAsync(async function (req, res, next) {
  const { quizId } = req.params

  const quiz = await Quiz.findById(quizId)

  if (quiz.author.toString() !== req.user.id.toString()) {
    return next(
      new AppError(401, 'You are not authorized to delete this tweet')
    )
  }

  await Quiz.findByIdAndDelete(quizId)

  res.status(204).json({
    status: 'success',
    message: 'Quiz deleted successfully',
  })
})

export const getQuestions = catchAsync(async function (req, res, next) {
  const { quizId } = req.params

  const questions = await Question.find({ quiz: quizId })

  res.status(200).json({
    status: 'success',
    data: {
      questions,
    },
  })
})

export const addQuestions = catchAsync(async function (req, res, next) {
  const questionsData = req.body.map((question: Question) => {
    const extractedQuestion = extract(question, 'question', 'options')
    extractedQuestion.quiz = req.params.quizId

    return extractedQuestion
  })

  const questions = await Question.create(questionsData)

  res.status(201).json({
    status: 'success',
    data: {
      questions,
    },
  })
})
