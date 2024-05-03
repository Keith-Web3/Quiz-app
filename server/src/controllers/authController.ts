import User from '../models/userModel.js'
import catchAsync from '../utils/catchAsync.js'
import extract from '../utils/extract.js'

export const signup = catchAsync(async function (req, res, next) {
  const userData = extract(
    req.body,
    'name',
    'email',
    'password',
    'passwordConfirm'
  )

  const user = await User.create(userData)

  user.password = null

  res.status(201).json({
    status: 'success',
    data: {
      user,
    },
  })
})
