import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

router.get('/verify', async (req, res) => {
  try {
    const token = req.cookies.Jtoken
    console.log(token)
    if (!token) {
      return res.status(401).json({ message: 'Token not provided' })
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' })
      }

      const user = await User.findOne({ username: decoded.UserName })
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
      res.send({ email: user.username, role: user.Role, is_true: true })
    })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export default router
