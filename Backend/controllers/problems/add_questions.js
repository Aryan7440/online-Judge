const requestResponseUtils = require('../../utils/request_response_utils')
const Question = require('../../models/Question')
const TestCases = require('../../models/TestCases')
exports.addQuestions = async (request, reply) => {
    const { title, description, difficulty, tags, testCases } = request.body
    try {
        logger.info(`Adding question: ${title}`)
        const problem = new Question({
            title: title,
            description: description,
            difficulty: difficulty,
            tags: tags
        })
        const savedQuestion = await problem.save()
        const qid = savedQuestion._id;
        logger.info(savedQuestion)
        const TCs = testCases.map(async (test) => {
            const testCase = new TestCases({
                question_id: qid,
                input: test.input,
                expectedOutput: test.output
            })
            testCase.save()
            return testCase
        })
        try {
            await Promise.all(TCs);
        } catch (error) {
            logger.error(`Error in adding testcases: ${error}`)
            return requestResponseUtils.getBadRequestReply(reply, 'Error in adding testcases', error)
        }

        return requestResponseUtils.getSuccessfullyCreatedReply(reply, 'Question added successfully', savedQuestion)
    } catch (error) {
        logger.error(`Error in adding problem: ${error}`)
        return requestResponseUtils.getBadRequestReply(reply, error)
    }
}