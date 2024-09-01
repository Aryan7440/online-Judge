const requestResponseUtils = require('../../Utils/request_response_utils')

exports.logout = async (request, reply) => {
  try {
    request.clearCookie('Jtoken', {
      httpOnly: true,
      secure: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax',
      path: '/',
      maxAge: 0,
    })
    return requestResponseUtils.getSuccessReply(reply, 'Logged out')
  } catch (error) {
    return requestResponseUtils.getInternalServerReply(
      reply,
      'Error occured In logging Out'
    )
  }
}
