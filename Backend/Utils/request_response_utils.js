const { StatusCodes } = require('http-status-codes')

exports.getSuccessReply = (reply, message, data) => {
  return reply.status(StatusCodes.OK).send({ message: message, data: data })
}

exports.getSuccessfullyCreatedReply = (reply, message, data) => {
  return reply
    .status(StatusCodes.CREATED)
    .send({ message: message, data: data })
}

exports.getFalseSuccessReply = (reply, message, data) => {
  return reply
    .status(StatusCodes.CREATED)
    .send({ success: false, message: message, data: data })
}

exports.getBadRequestReply = (reply, message, error) => {
  return reply.status(StatusCodes.BAD_REQUEST).send({ message: message, data: error })
}

exports.getNotFoundReply = (reply, message, error) => {
  return reply.status(StatusCodes.NOT_FOUND).send({ message: message, data: error })
}

exports.getInternalServerReply = (reply, message, error) => {
  return reply
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send({ message: message, data: error })
}
exports.getUnauthorizedReply = (reply, message) => {
  return reply.status(StatusCodes.UNAUTHORIZED).send({ message: message })
}

exports.getForbiddenReply = (reply, message) => {
  return reply.status(StatusCodes.FORBIDDEN).send({ message: message })
}
