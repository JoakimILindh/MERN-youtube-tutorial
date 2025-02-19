import mongoose from 'mongoose'
import News from '../models/news.model.js'
import asyncHandler from 'express-async-handler'

export const createNewsArticle = asyncHandler(async (req, res, next) => {
  const { title, content } = req.body

  if(!title || !content) {
    return res.status(400).json({ message: "Title and conent are required" })
  }

  const newsArticle = await News.create({ title, content })

  res.status(201).json(newsArticle)
})

export const getNewsArticles = asyncHandler(async (req, res) => {
  const newsArticles = await News.find().exec()

  res.status(200).json(newsArticles)
})


export const getNewsArticle = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "invalid id" })
  }

  const newsArticle = await News.findById(id).exec()

  if(!newsArticle) {
    return res.status(404).json({ message: `Can't find what you are looking for`})
  }

  res.status(200).json(newsArticle)
})



export const updateNewsArticle = asyncHandler(async (req, res) => {
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

  const updatedNewsArticle = await News.findByIdAndUpdate(id, toUpdate, { new: true }).exec()
  if(!updatedNewsArticle) {
    return res.status(404).json({ message: `Can't find that article`})
  }

  res.status(200).json(updatedNewsArticle)
})


export const deleteNewsArticle = asyncHandler(async (req, res) => {
  const { id } = req.params
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "invalid id" })
  }

  const newsArticle = await News.findByIdAndDelete(id).exec()

  if(!newsArticle) {
    return res.status(404).json({ message: `Can't find that article`})
  }

  res.sendStatus(204)
})