const User = require('../../models/User')
const requestResponseUtils = require('../../Utils/request_response_utils')
exports.deleteUser = async (request, reply) => {
  const { email } = request.body
  console.log('delete user page entered')
  const existingUser = await User.findOne({ email })
  if (!existingUser) {
    return requestResponseUtils.getBadRequestReply(reply, 'User does not exist')
  }
  try {
    await User.deleteOne({ email: email })
    return requestResponseUtils.getSuccessReply(
      reply,
      'User deleted succesfully'
    )
  } catch (error) {
    return requestResponseUtils.getInternalServerReply(reply, 'Error occured')
  }
}
