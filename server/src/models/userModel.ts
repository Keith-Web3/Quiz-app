import mongoose from 'mongoose'
import validator from 'validator'

interface User {
  name: string
  email: string
  password: string
  passwordConfirm: string
  active: boolean
  photo?: string
}

const userSchema = new mongoose.Schema<User>({
  name: {
    type: 'string',
    required: [true, 'Please provide a name'],
    minlength: [3, 'Name contain 3 or more letters'],
  },
  email: {
    type: 'string',
    required: [true, 'Please provide a valid email'],
    validate: [validator.isEmail, 'Please provide a valid email'],
    unique: true,
  },
  password: {
    type: 'string',
    required: [true, 'Please provide a password'],
    minlength: [5, 'Password must have a length of 5 or longer'],
    select: false,
  },
  passwordConfirm: {
    type: 'string',
    required: [true, 'Please provide a password'],
    minlength: [5, 'Password must have a length of 5 or longer'],
    validate: {
      validator: function (val: string) {
        return val === this.password
      },
      message: 'Passwords are not the same',
    },
    select: false,
  },
  active: {
    type: 'boolean',
    select: false,
    default: true,
  },
})

const User = mongoose.model<User>('User', userSchema)

export default User
