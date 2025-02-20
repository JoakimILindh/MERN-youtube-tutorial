import express from 'express';
import { deleteComment } from '../controllers/comment.controller.js';
const router = express.Router();


router.delete('/:id', deleteComment)


export default router;