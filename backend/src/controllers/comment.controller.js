import mongoose from 'mongoose';
import Comment from '../models/comment.model.js'
import Thread from '../models/thread.model.js';

import asyncHandler from 'express-async-handler'

export const createComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const user = req.user._id
  const threadId = req.params.threadId

  if(!content) {
    return res.status(400).json({ message: "Content is required" })
  }

  const comment = await Comment.create({ content, thread: threadId, user })

  const thread = await Thread.findById(threadId).exec()
  thread.comments.push(comment._id)

  await thread.save()

  res.status(201).json(comment)
})

export const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "invalid id"})
  }

  const comment = await Comment.findById(id).exec()

  if(!comment) {
    return res.status(404).json({ message: `Can't find what you are looking for` })
  }

  // TODO: kolla om användaren äger commentaren eller om Admin

  const thread = await Thread.findById(comment.thread).exec()
  thread.comments = thread.comments.filter(c => c.toString() !== id)

  await Comment.deleteOne({ _id: id }).exec()
  await thread.save()

  res.sendStatus(204)
})