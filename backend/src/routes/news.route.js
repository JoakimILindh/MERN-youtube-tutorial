import express from 'express'
import { createNewsArticle, deleteNewsArticle, getNewsArticle, getNewsArticles, updateNewsArticle } from '../controllers/news.controller.js'
import { verifyRoles, verifyToken } from '../middleware/auth.middleware.js'
import ROLES from '../constants/roles.js'

const router = express.Router()

// CRUD

router.post('/', verifyToken, verifyRoles(ROLES.ADMIN, ROLES.MODERATOR), createNewsArticle) // CREATE

router.get('/', getNewsArticles) // READ
router.get('/:id', getNewsArticle) // READ

router.put('/:id', verifyToken, verifyRoles(ROLES.ADMIN, ROLES.MODERATOR), updateNewsArticle) // UPDATE
router.patch('/:id', verifyToken, verifyRoles(ROLES.ADMIN, ROLES.MODERATOR), updateNewsArticle) // UPDATE

router.delete('/:id', verifyToken, verifyRoles(ROLES.ADMIN, ROLES.MODERATOR), deleteNewsArticle) // DELETE


export default router