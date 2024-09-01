const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const requestResponseUtils = require('../../Utils/request_response_utils')

exports.login = async (request, reply) => {
  const { username, password } = request.body
  const user = await User.findOne({ username })

  if (!user) {
    return requestResponseUtils.getBadRequestReply(
      reply,
      'Invalid username or password'
    )
  }
  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) {
    return requestResponseUtils.getBadRequestReply(
      reply,
      'Invalid username or password'
    )
  }

  const token = jwt.sign(
    { UserName: user.username },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: '1h',
    }
  )
  reply.cookie('Jtoken', token, {
    httpOnly: true,
    secure: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax',
    path: '/',
    maxAge: 2 * 60 * 60 * 1000,
  })

  reply.code(200).send({
    UserName: user.username,
    istrue: true,
    role: user.Role,
    message: 'Login Successful',
  })
}
