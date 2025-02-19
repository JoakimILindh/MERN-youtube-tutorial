import express from 'express'
import { createNewsArticle } from '../controllers/news.controller.js'

const router = express.Router()

// CRUD

router.post('/', createNewsArticle) // CREATE

router.get('/', () => {}) // READ
router.get('/*id', () => {}) // READ

router.put('/*id', () => {}) // UPDATE
router.patch('/*id', () => {}) // UPDATE

router.delete('/*id', () => {}) // DELETE


export default router