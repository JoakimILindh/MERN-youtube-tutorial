import mongoose from 'mongoose';
import Thread from '../models/thread.model.js'
import asyncHandler from 'express-async-handler'

export const createThread = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const user = req.user._id;

  console.log({user})

  if(!title || !content) {
    return res.status(400).json({ message: "title and content are required"})
  }

  const thread = await Thread.create({ title, content, user })
  res.status(201).json(thread)
})

export const getThreads = asyncHandler(async (req, res) => {
  const threads = await Thread.find()
    .populate("user", "name")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "name"
      }
    }).exec()

  res.status(200).json(threads)
})

export const updateThread = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { title, content } = req.body;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "invalid id" })
  }

  const toUpdate = {}
  if(title) toUpdate.title = title
  if(content) toUpdate.content = content

  if(Object.keys(toUpdate).length === 0) {
    res.status(400).json({ message: "No changes provided" })
  }


  const thread = await Thread.findOneAndUpdate({ _id: id, user: req.user._id }, toUpdate, { new: true }).exec()
  if(!thread) {
    return res.status(404).json({ message: `Can't find that thread`})
  }

  res.status(200).json(thread)
})


export const deleteThread = asyncHandler(async (req, res) => {
  const { id } = req.params
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "invalid id" })
  }

  const thread = Thread.findById(id).exec()

  if(!thread) {
    return res.status(404).json({ message: `Can't find that thread`})
  }

  if(thread.user.toString() !== req.user._id && req.user.role !== "admin" && req.user.role !== "moderator") {
    return res.status(403).json({ mesasage: 'You are not allowed to delete this thread' })
  }

  await Thread.deleteOne({ _id: id }).exec();

  res.sendStatus(204)
})