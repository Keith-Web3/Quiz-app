import express from 'express'
import {
  signup,
  login,
  protect,
  forgotPassword,
} from '../controllers/authController.js'

const router = express.Router()

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/forgotPassword').post(forgotPassword)

export default router
