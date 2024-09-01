const requestResponseUtils = require('../../Utils/request_response_utils')
const Problem = require('../../models/Problem')
const ProblemTest = require('../../models/ProblemTest')
const TestCases = require('../../models/TestCases')
const { v4: uuidv4 } = require('uuid')
exports.addProblem = async (request, reply) => {
    const { title, description, difficulty, tags, submission } = request.body
    try {
        const Pid = uuidv4()
        const problem = new Problem({
            problem_id: Pid,
            title: title,
            description: description,
            difficulty: difficulty,
            tags: tags
        })
        const savedProblem = await problem.save()
        console.log('problem saved')
        let sr = 1
        const TCs = submission.testCases.map(async (test) => {
            const tsID = uuidv4()
            const testCaseInstance = new TestCases({
                TestCaseId: tsID,
                serial: sr,
                input: test.input,
                expectedOutput: test.output
            })
            sr++
            const ProblemTestcase = new ProblemTest({
                problem_id: Pid,
                TestCaseId: tsID
            })
            await testCaseInstance.save()
            console.log('ts saved')
            await ProblemTestcase.save()
            console.log('qts saved')
            return testCaseInstance
        })
        res.status(201).json(savedProblem)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}