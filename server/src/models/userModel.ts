import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

interface User {
  name: string
  email: string
  password: string
  passwordConfirm: string
  active: boolean
  passwordChangedAt: Date
  photo?: string
  comparePasswords: (password: string) => Promise<boolean>
  passwordResetToken: string
  passwordTokenExpiresAt: Date
  createResetToken: () => string
}

const userSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    minlength: [3, 'Name contain 3 or more letters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide a valid email'],
    validate: [validator.isEmail, 'Please provide a valid email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [5, 'Password must have a length of 5 or longer'],
    select: false,
  },
  passwordConfirm: {
    type: String,
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
    type: Boolean,
    select: false,
    default: true,
  },
  passwordChangedAt: {
    type: Date,
    default: new Date(0),
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordTokenExpiresAt: {
    type: Date,
    select: false,
  },
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  const hashedPassword = await bcrypt.hash(this.password, 12)

  this.password = hashedPassword
  this.passwordConfirm = null

  next()
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isNew) return next()

  this.passwordChangedAt = new Date()

  next()
})

userSchema.methods.comparePasswords = async function (password: string) {
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.createResetToken = function () {
  const token = crypto.randomBytes(32).toString('hex')

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex')

  this.passwordTokenExpiresAt = Date.now() + 2 * 60 * 1000

  return token
}

const User = mongoose.model<User>('User', userSchema)

export default User
