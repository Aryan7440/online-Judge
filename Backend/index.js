const express = require('express')
const User = require('./models/User')
const cors = require('cors')
const dotenv = require('dotenv')
const dbConnection = require('./config/db')
const verify = require('./routes/verify')
const authRoutes = require('./routes/auth_routes')
const addQuestion = require('./routes/AddQuestions')
const getQuestions = require('./API/Fetchproblems')
const http = require('http')
const compile = require('./API/RunCode')
const submit = require('./API/SubmitCode')
const getTestCases = require('./API/FetchTestCases')
dotenv.config()
const port = 3000
const app = express()
const server = http.createServer(app)

dbConnection.connectToDatabase()

server.listen(port, () => console.log(`Server running on port ${port}`))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(
  cors({
    origin: ['http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
)
// app.use('/', auth)
app.use('/api/v1/authRoutes', authRoutes)
app.use('/', verify)
app.use('/', addQuestion)
app.use('/', getQuestions)
app.use('/', compile)
app.use('/', submit)
app.use('/', getTestCases)

app.get('/Dashboard', async (req, res) => {
  const user = await User.findOne({ investor_email: req.headers.email })
  return res.send({ inv_name: user.investor_name })
})
