import express from 'express'
import { getUserProfile, login, register } from '../controllers/user.controller.js'
import { verifyToken } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)

router.get('/profile', verifyToken, getUserProfile)

export default router