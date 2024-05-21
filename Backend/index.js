import express from 'express'
import mongoose from 'mongoose'
import auth from './routes/auth.js'
import User from './models/User.js'
import cors from 'cors'
import dotenv from 'dotenv'
import verifyToken from './middleware/verifyToken.js'
import http from 'http'
dotenv.config()
const port = 3000
const app = express()
const server = http.createServer(app)
mongoose
  .connect(process.env.MONGOOSE_API_KEY)
  .then((p) => {
    console.log('DB Connected')
  })
  .catch((err) => console.log(err))

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
app.use('/', auth)

app.get('/checktoken', verifyToken, async (req, res) => {
  return res.send({ is_true: true })
})
app.get('/Dashboard', async (req, res) => {
  const user = await User.findOne({ investor_email: req.headers.email })
  return res.send({ inv_name: user.investor_name })
})
// app.listen(port, () => console.log(`Server running on port ${port}`))
