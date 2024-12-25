const requestResponseUtils = require('../../utils/request_response_utils')
const TestCases = require('../../models/TestCases')

exports.fetchTestCases = async (request, reply) => {
    try {
        const question_id = request.params.question_id;
        logger.info(`Fetching testcases for question: ${question_id}`)
        const testcases = await TestCases.find({ question_id: question_id });
        if (testcases.length === 0) {
            return requestResponseUtils.getNotFoundReply(reply, 'Testcases not found')
        }
        logger.info(`Testcases fetched successfully for question: ${question_id}`)
        return requestResponseUtils.getSuccessReply(reply, 'Testcases fetched successfully', testcases)
    } catch (error) {
        logger.error(`Error in fetching testcases: ${error}`)
        return requestResponseUtils.getBadRequestReply(reply, error)
    }
}