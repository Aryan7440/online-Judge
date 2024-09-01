const User = require('../../models/User')
const requestResponseUtils = require('../../Utils/request_response_utils')
exports.deleteUser = async (request, reply) => {
  try {
    const { email } = request.body
    logger.info('delete user page entered')
    const existingUser = await User.findOne({ email })
    if (!existingUser) {
      return requestResponseUtils.getBadRequestReply(reply, 'User does not exist')
    }
    await User.deleteOne({ email: email })
    logger.info('User deleted succesfully')
    return requestResponseUtils.getSuccessReply(
      reply,
      'User deleted succesfully'
    )
  } catch (error) {
    logger.error('Error occured while deleting user:', error)
    return requestResponseUtils.getInternalServerReply(reply, 'Error occured')
  }
}
