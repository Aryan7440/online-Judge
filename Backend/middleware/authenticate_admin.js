const requestResponseUtils = require('../Utils/request_response_utils')
const jwt = require('jsonwebtoken')
exports.authenticateAdmin = (request, reply, next) => {
    try {
        const authHeader = request.headers.authorization
        if (!authHeader) {
            return requestResponseUtils.getUnauthorizedReply(reply, 'Token unavailable')
        }
        const token = authHeader.split(' ')[1]
        if (!token) {
            return requestResponseUtils.getUnauthorizedReply(reply, 'Token unavailable')
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY)
            if (decoded.role === 'Admin') {
                next()
            } else {
                return requestResponseUtils.getForbiddenReply(reply, 'Role not authorized')
            }
        } catch (error) {
            return requestResponseUtils.getForbiddenReply(reply, 'Token invalid')
        }
    } catch (error) {
        return requestResponseUtils.getInternalServerReply(reply, error)
    }
}