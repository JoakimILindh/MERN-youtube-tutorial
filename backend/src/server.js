import app from './app.js'
import mongoose from 'mongoose'
import http from 'http'
import { Server } from 'socket.io'

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

const dbConnect = async () => {
  try {
    const mongo = await mongoose.connect(MONGO_URI)
    console.log(`MongoDB Connected: ${mongo.connection.host}`)
  } catch (err) {
    console.log(`MongoDB Connection Error: ${err.message}`)
    process.exit(1)
  }
}

const startServer = async () => {
  try {
    await dbConnect()
    server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
  } catch (err) {
    console.log('Failed to start server:', err.message)
    process.exit(1)
  }
}

startServer()

io.on('connection', (socket) => {
  
  const userName = socket.handshake.query.user;
  // console.log('a user connected: ' + socket.id)
  console.log(`${userName} has connected`)


  socket.on('disconnect', () => {
    console.log(`${userName} has disconnected`)
  })
})


export { io }