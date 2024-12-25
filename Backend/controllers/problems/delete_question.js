const requestResponseUtils = require('../../utils/request_response_utils')
const Question = require('../../models/Question')
const TestCases = require('../../models/TestCases')

exports.deleteQuestion = async (request, reply) => {
    const { questionId } = request.body
    try {
        logger.info(`Deleting question: ${questionId}`)
        const deleteResult = await Question.deleteById(questionId);
        if (deleteResult.deletedCount == 0) {
            return requestResponseUtils.getNotFoundReply(reply, 'Question not found')
        }
        await TestCases.deleteMany({ question_id: questionId });
        logger.info(`Question deleted successfully: ${questionId}`)
        return requestResponseUtils.getSuccessReply(reply, 'Question deleted successfully', deleteResult)
    } catch (error) {
        logger.error(`Error in deleting question: ${error}`)
        return requestResponseUtils.getBadRequestReply(reply, error)
    }
}