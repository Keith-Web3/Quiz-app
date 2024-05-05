import express from 'express'
import {
  signup,
  login,
  protect,
  forgotPassword,
  resetPassword,
} from '../controllers/authController.js'

const router = express.Router()

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/forgotPassword').post(forgotPassword)
router.route('/resetPassword/:resetToken').post(resetPassword)

export default router
