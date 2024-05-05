import { Request } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import User from '../models/userModel.js'
import AppError from '../utils/appError.js'
import catchAsync from '../utils/catchAsync.js'
import extract from '../utils/extract.js'
import { sendMail } from '../utils/email.js'

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

export const protect = catchAsync(async function (req, res, next) {
  const authToken = req.headers.authorization

  if (!authToken || !authToken.startsWith('Bearer')) {
    return next(
      new AppError(401, 'You are not logged in, please log into access!')
    )
  }
  const token = authToken.split(' ')[1]

  const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload

  const user = await User.findById(decoded.userId)

  if (!user) {
    return next(
      new AppError(401, 'The user belonging to this token no longer exists')
    )
  }

  if (user.passwordChangedAt.getTime() > decoded.iat * 1000) {
    return next(
      new AppError(401, 'Password changed, please login again to access.')
    )
  }

  ;(req as Request & { user: User }).user = user

  next()
})

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

export const forgotPassword = catchAsync(async function (req, res, next) {
  const { email } = req.body

  const user = await User.findOne({
    email,
  })
  if (!user) {
    return next(new AppError(404, 'This user does not exist'))
  }

  try {
    const token = user.createResetToken()

    user.save()

    const resetUrl = `${req.protocol}//${req.hostname}/v1/api/resetPassword/${token}`
    await sendMail(
      user.email,
      'Password reset',
      `Hello ${user.name}, you requested a password reset. Visit ${resetUrl} to change your password`
    )
  } catch (err) {
    user.passwordResetToken = null
    user.passwordTokenExpiresAt = null

    user.save({ validateBeforeSave: false })

    console.log(err)

    return next(
      new AppError(
        400,
        'An error occurred, please request for password reset again'
      )
    )
  }

  res.status(200).json({
    status: 'success',
    message: 'Password reset email sent successfully',
  })
})
