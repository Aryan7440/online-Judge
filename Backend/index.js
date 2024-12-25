const dotenv = require('dotenv')
dotenv.config()
require('./Utils/logger')

const express = require('express')
const cors = require('cors')
const dbConnection = require('./config/db')
const authRoutes = require('./routes/auth_routes')
const questionRoutes = require('./routes/question_routes')
const http = require('http')

const port = 3000
const app = express()
const server = http.createServer(app)
const cookieParser = require('cookie-parser')
dbConnection.connectToDatabase()

server.listen(port, () => logger.info(`Server running on port ${port}`))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(
  cors({
    origin: ['http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
)
app.use(cookieParser())

app.use('/api/v1/authRoutes', authRoutes)
app.use('/api/v1/Questions', questionRoutes)


