import express from 'express'
import { verifyToken } from '../middleware/auth.middleware.js'
import { getNotifications, readNotification } from '../controllers/notification.controller'

const router = express.Router()

router.get('/', verifyToken, getNotifications);
router.put('/:id', verifyToken, readNotification);
router.patch('/:id', verifyToken, readNotification);

export default router