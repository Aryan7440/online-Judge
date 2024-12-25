const requestResponseUtils = require('../../utils/request_response_utils.js')
const Question = require('../../models/Question')

exports.fetchProblem = async (request, reply) => {
    try {
        const question_id = request.params.question_id;
        logger.info(`Fetching question: ${questionId}`)
        const question = await Question.findById(question_id);
        if (!question) {
            return requestResponseUtils.getNotFoundReply(reply, 'Question not found')
        }
        logger.info(`Question fetched successfully: ${question_id}`)
        return requestResponseUtils.getSuccessReply(reply, 'Question fetched successfully', question)
    } catch (error) {
        logger.error(`Error in fetching question: ${error}`)
        return requestResponseUtils.getBadRequestReply(reply, error)
    }
}