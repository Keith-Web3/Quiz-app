import mongoose, { ObjectId } from 'mongoose'

interface QuizInterface {
  id: string
  name: string
  author: ObjectId
  description: string
  createdAt: Date
  updatedAt: Date
}

const quizSchema = new mongoose.Schema<QuizInterface>(
  {
    name: {
      type: String,
      required: [true, 'Every quiz must have a name.'],
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Every quiz must have an author.'],
    },
    description: {
      type: String,
      required: [true, 'Every quiz must have a description.'],
    },
  },
  { timestamps: true }
)

export const Quiz = mongoose.model<QuizInterface>('Quiz', quizSchema)
