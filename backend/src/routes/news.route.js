import express from 'express'
import { createNewsArticle, deleteNewsArticle, getNewsArticle, getNewsArticles, updateNewsArticle } from '../controllers/news.controller.js'

const router = express.Router()

// CRUD

router.post('/', createNewsArticle) // CREATE

router.get('/', getNewsArticles) // READ
router.get('/:id', getNewsArticle) // READ

router.put('/:id', updateNewsArticle) // UPDATE
router.patch('/:id', updateNewsArticle) // UPDATE

router.delete('/:id', deleteNewsArticle) // DELETE


export default router