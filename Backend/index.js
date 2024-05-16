import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from './models/User'

mongoose
  .connect(process.env.MONGOOSE_API_KEY)
  .then((p) => {
    console.log('DB Connected')
  })
  .catch((err) => console.log(err))
server.listen(3001, () => {
  console.log('Server Running on port 3001')
})

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
)

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    console.log('Unauthorized Access: Token unavailable')
    return res.status(401).json({ message: 'Token unavailable' })
  }
  jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, decoded) => {
    if (err) {
      console.log('Forbidden: Token invalid')
      return res.status(403).json({ message: 'Token Invalid' })
    }
    req.user = decoded
    console.log('Token Verified')
    next()
  })
}
app.post('/signup', async (req, res) => {
  const {
    role,
    username,
    password,
    email,
    DateOfBirth,
    FullName,
    Bio,
    ProfilePicture,
    Rating,
  } = req.body

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(400).json({ message: 'Email is already in use' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = new User({
      role,
      username,
      password: hashedPassword,
      email,
      DateOfBirth,
      FullName,
      Bio,
      ProfilePicture,
      Rating,
    })
    await user.save()
  } catch (err) {
    console.log(err)
    console.log('Error Occured while registration')
    return res.send({ is_true: false, message: 'Error occured' })
  }
  res.status(201).json({ message: 'User created' })
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  if (!user) {
    return res.status(400).json({ message: 'Invalid username or password' })
  }

  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) {
    return res.status(400).json({ message: 'Invalid username or password' })
  }

  const token = jwt.sign({ userId: user.id }, 'SECRET_KEY', { expiresIn: '1h' })

  res.json({ token })
})

app.listen(3000, () => console.log('Server running on port 3000'))
