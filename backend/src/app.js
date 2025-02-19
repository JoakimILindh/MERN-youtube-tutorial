import express from 'express'

import newsRoutes from './routes/news.route.js'
import { errorHandler, notFound } from './middleware/error.middleware.js'

const app = express()

app.use(express.json())

app.use('/api/news', newsRoutes)


app.use(notFound) // NotFound
app.use(errorHandler) // ErrorHandler

export default app