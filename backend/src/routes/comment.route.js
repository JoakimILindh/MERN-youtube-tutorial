import express from 'express';
import { deleteComment } from '../controllers/comment.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
const router = express.Router();


router.delete('/:id', verifyToken, deleteComment)


export default router;