import User from '../models/userModel.js'
import catchAsync from '../utils/catchAsync.js'
import extract from '../utils/extract.js'
import jwt from 'jsonwebtoken'

export const signToken = function (userId: string) {
  const token = jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_TOKEN_EXPIRES_IN }
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
