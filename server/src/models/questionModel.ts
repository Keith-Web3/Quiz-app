import mongoose, { ObjectId } from 'mongoose'

interface Answer {
  answer: string
  isCorrect?: boolean
  id: ObjectId
}

interface Question {
  id: ObjectId
  question: string
  options: Answer[]
  quiz: ObjectId
}

const questionSchema = new mongoose.Schema<Question>({
  question: {
    type: String,
    required: [true, 'A question cannot be empty'],
  },
  options: {
    type: [
      {
        answer: {
          type: String,
          required: [true, 'An answer cannot be empty'],
        },
        isCorrect: Boolean,
        id: {
          type: mongoose.Schema.ObjectId,
          default: new mongoose.Types.ObjectId(),
        },
      },
    ],
    validate: {
      validator: function (val: Answer[]) {
        return val.length === 4
      },
      message: 'Each question must have four options',
    },
  },
  quiz: {
    type: mongoose.Schema.ObjectId,
    required: [true, 'Every question must belong to a quiz.'],
  },
})

const Question = mongoose.model<Question>('Question', questionSchema)

export default Question
