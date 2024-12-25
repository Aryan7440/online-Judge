const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const requestResponseUtils = require('../Utils/request_response_utils')

const router = express.Router()

router.get('/verify', async (req, res) => {
  try {
    const token = req.cookies.Jtoken
    if (!token) {
      return requestResponseUtils.getFalseSuccessReply(
        res,
        'No token provided',
        null
      )
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        return requestResponseUtils.getForbiddenReply(res, 'Invalid token')
      }

      const user = await User.findOne({ username: decoded.UserName })
      if (!user) {
        return requestResponseUtils.getNotFoundReply(res, 'User not found')
      }
      res.send({ email: user.username, role: user.Role, is_true: true })
    })
  } catch (error) {
    logger.error('Error:', error)
    return requestResponseUtils.getInternalServerReply(
      res,
      'Internal Server Error'
    )
  }
})

module.exports = router
