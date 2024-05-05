import mongoose, { ObjectId } from 'mongoose'

interface Quiz {
  id: string
  name: string
  author: ObjectId
  description: string
  createdAt: Date
  updatedAt: Date
}

const quizSchema = new mongoose.Schema<Quiz>(
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

export const Quiz = mongoose.model('Quiz', quizSchema)
