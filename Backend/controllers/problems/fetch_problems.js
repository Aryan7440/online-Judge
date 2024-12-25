// learn pagination
const Question = require('../../models/Question');
const requestResponseUtils = require('../../utils/request_response_utils');
exports.getQuestions = async (request, reply) => {
    try {
        const page = parseInt(request.query.page) || 1;
        const limit = parseInt(request.query.limit) || 20;

        const { tags, difficulty, sort } = request.body;


        const startIndex = (page - 1) * limit;
        const query = {};
        if (tags && tags.length > 0) {
            query.tags = { $in: tags };
        }
        if (difficulty && difficulty.length > 0) {
            query.difficulty = { $in: difficulty };
        }

        const problems = await Question.find({ query })
            .sort(sort || {})
            .limit(limit)
            .skip(startIndex);
        if (problems.length === 0) {
            return requestResponseUtils.getNotFoundReply(reply, 'Questions not found')
        }
        const pagination = {
            currentPage: page,
            totalDocuments: problems.length,
        };
        return requestResponseUtils.getSuccessReply(reply, 'Questions fetched successfully', { problems, pagination })
    } catch (error) {
        return requestResponseUtils.getBadRequestReply(reply, `Error in Fetching questions`, error)
    }
}