import User from '../models/userModel.js'
import catchAsync from '../utils/catchAsync.js'

export const getMe = catchAsync(async function (req, res, next) {
  const user = req.user

  res.status(200).json({
    status: 'success',
    data: { user },
  })
})

export const getUser = catchAsync(async function (req, res, next) {
  const { id } = req.params

  const user = await User.findById(id)

  res.status(200).json({
    status: 'success',
    data: { user },
  })
})

export const getAllUsers = catchAsync(async function (req, res, next) {
  const users = await User.find()

  res.status(200).json({
    status: 'success',
    data: { users },
  })
})
