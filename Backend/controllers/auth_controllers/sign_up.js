const bcrypt = require('bcryptjs')
const User = require('../../models/User')
const requestResponseUtils = require('../../Utils/request_response_utils')
const validators = require('../../Utils/validators')

exports.signUp = async (request, reply) => {
  const { username, password, email, DateOfBirth, FullName } = request.body
  logger.info('/signUp called')
  if (!validators.validateEmail(email)) {
    return requestResponseUtils.getBadRequestReply(
      reply,
      'Invalid email Format'
    )
  }
  if (!validators.validatePassword(password)) {
    return requestResponseUtils.getBadRequestReply(
      reply,
      'Password must contain at least one number, one uppercase and lowercase letter, and at least 6 characters'
    )
  }
  const existingUser = await User.findOne({ email: email })
  // console.log('existing user:', existingUser)

  if (existingUser) {
    return requestResponseUtils.getBadRequestReply(
      reply,
      'Email is already in use'
    )
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  // console.log('hashed password', hashedPassword)
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
    // console.log('user:', user)
    await user.save()
    // console.log('user saved:', user)
  } catch (error) {
    logger.error('Error occured:', error)
    return requestResponseUtils.getInternalServerReply(reply, 'Error occured')
  }
  return requestResponseUtils.getSuccessReply(reply, 'User created')
}
