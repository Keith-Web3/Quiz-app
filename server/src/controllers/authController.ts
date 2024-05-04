import User from '../models/userModel.js'
import AppError from '../utils/appError.js'
import catchAsync from '../utils/catchAsync.js'
import extract from '../utils/extract.js'
import jwt from 'jsonwebtoken'

export const signToken = function (userId: string, rememberUser?: boolean) {
  const token = jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET,
    { expiresIn: rememberUser ? '30d' : process.env.JWT_TOKEN_EXPIRES_IN }
  )

  return token
}

export const signup = catchAsync(async function (req, res, next) {
  const userData = extract(
    req.body,
    'name',
    'email',
    'password',
    'passwordConfirm'
  )

  const user = await User.create(userData)
  const token = signToken(user.id)

  user.password = null

  res.status(201).json({
    status: 'success',
    data: {
      user,
    },
    token,
  })
})

export const login = catchAsync(async function (req, res, next) {
  const { email, password, rememberUser } = req.body
  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    return next(new AppError(404, 'This user does not exist'))
  }
  const isPasswordCorrect = await user.comparePasswords(password)

  if (!isPasswordCorrect) {
    return next(new AppError(400, 'Invalid email or password'))
  }
  const token = signToken(user.id, rememberUser)
  user.password = null

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
    token,
  })
})
