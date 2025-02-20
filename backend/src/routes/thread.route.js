import express from 'express';
import { createThread, deleteThread, getThreads, updateThread } from '../controllers/thread.controller.js';
import { createComment } from '../controllers/comment.controller.js';
const router = express.Router();


router.route('/')
  .get(getThreads)
  .post(createThread)

router.route('/:id')
  .put(updateThread)
  .patch(updateThread)
  .delete(deleteThread)


router.route('/:threadId/comment')
  .post(createComment)


export default router;