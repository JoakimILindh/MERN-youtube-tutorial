import express from 'express'
import { createNewsArticle, deleteNewsArticle, getNewsArticle, getNewsArticles, updateNewsArticle } from '../controllers/news.controller.js'
import { verifyToken } from '../middleware/auth.middleware.js'

const router = express.Router()

// CRUD

router.post('/', verifyToken, createNewsArticle) // CREATE

router.get('/', getNewsArticles) // READ
router.get('/:id', getNewsArticle) // READ

router.put('/:id', verifyToken, updateNewsArticle) // UPDATE
router.patch('/:id', verifyToken, updateNewsArticle) // UPDATE

router.delete('/:id', verifyToken, deleteNewsArticle) // DELETE


export default router