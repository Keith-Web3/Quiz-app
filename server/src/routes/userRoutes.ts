import express from 'express'
import { getAllUsers, getMe, getUser } from '../controllers/userControllers.js'
import { protect } from '../controllers/authController.js'

const router = express.Router()

router.get('/', getAllUsers)
router.get('/getMe', protect, getMe)
router.get('/:id', getUser)

export default router
