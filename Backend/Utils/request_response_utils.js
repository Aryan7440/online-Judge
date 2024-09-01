const { StatusCodes } = require('http-status-codes')

exports.getSuccessReply = (reply, message, data) => {
  return reply.status(StatusCodes.OK).send({ message: message, data: data })
}

exports.getFalseSuccessReply = (reply, message, data) => {
  return reply
    .status(StatusCodes.CREATED)
    .send({ success: false, message: message, data: data })
}

exports.getBadRequestReply = (reply, message) => {
  return reply.status(StatusCodes.BAD_REQUEST).send({ message: message })
}

exports.getNotFoundReply = (reply, message) => {
  return reply.status(StatusCodes.NOT_FOUND).send({ message: message })
}

exports.getInternalServerReply = (reply, message) => {
  return reply
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send({ message: message })
}
exports.getUnauthorizedReply = (reply, message) => {
  return reply.status(StatusCodes.UNAUTHORIZED).send({ message: message })
}

exports.getForbiddenReply = (reply, message) => {
  return reply.status(StatusCodes.FORBIDDEN).send({ message: message })
}
