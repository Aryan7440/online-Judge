import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()
router.post('/signup', async (req, res) => {
  const { username, password, email, DateOfBirth, FullName } = req.body
  console.log('signup page entered')

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(400).json({ message: 'Email is already in use' })
  }
  if (typeof password !== 'string') {
    return res
      .status(400)
      .json({ message: 'Password is required and must be a string' })
  }
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = new User({
      Role: 'User',
      username: username || 'defaultUsername',
      password: hashedPassword,
      email: email || 'defaultEmail@example.com',
      DateOfBirth: DateOfBirth || '1970-01-01',
      FullName: FullName || 'Default Full Name',
      Bio: 'Default Bio',
      ProfilePicture: 'defaultProfilePictureUrl',
      Rating: 0,
    })
    console.log('user created')
    await user.save()
  } catch (err) {
    console.log(err)
    console.log('Error Occured while registration')
    return res.send({ is_true: false, message: 'Error occured' })
  }
  res.status(201).json({ is_true: true, message: 'User created' })
})

router.post('/login', async (req, res) => {
  console.log('login page entered')
  const { username, password } = req.body
  console.log(username, password)
  const user = await User.findOne({ username })
  console.log(user)
  if (!user) {
    return res.status(400).json({ message: 'Invalid username or password' })
  }

  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) {
    return res.status(400).json({ message: 'Invalid username or password' })
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1h',
  })
  console.log('token generated')
  res.send({
    istrue: true,
    Jtoken: token,
    role: user.Role,
    message: 'Login Successful',
  })
})
export default router
