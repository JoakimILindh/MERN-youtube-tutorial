import express from 'express'
import cors from 'cors'
import path from 'path'

import { errorHandler, notFound } from './middleware/error.middleware.js'
import newsRoutes from './routes/news.route.js'
import threadRoutes from './routes/thread.route.js'
import commentRoutes from './routes/comment.route.js'
import userRoutes from './routes/user.route.js'
import notificationRoutes from './routes/notification.route.js'
import { verifyToken } from './middleware/auth.middleware.js'

const __dirname = path.resolve()
const app = express()


const whitelist = ['http://localhost:5173', 'http://localhost:8080', '*']

// app.use(cors({
//   origin: (origin, callback) => {
//     if(whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }))
app.use(cors())

app.use(express.json())

app.use('/api/news', newsRoutes)
app.use('/api/threads', verifyToken, threadRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/auth', userRoutes)
app.use('/api/notifications', notificationRoutes)

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'))
  })
}

app.use(notFound) // NotFound
app.use(errorHandler) // ErrorHandler

export default app
