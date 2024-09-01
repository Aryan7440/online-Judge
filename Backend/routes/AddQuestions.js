const express = require('express')
const bodyParser = require('body-parser')
const Question = require('../models/Question')
const QuestionTest = require('../models/QuestionTest')
const TestCases = require('../models/TestCases')
const { v4: uuidv4 } = require('uuid')

const router = express.Router()
router.use(bodyParser.json())
router.post('/addquestion', async (req, res) => {
  const { title, description, difficulty, tags, submission } = req.body
  try {
    const Qid = uuidv4()
    const question = new Question({
      question_id: Qid,
      title: title,
      description: description,
      difficulty: difficulty,
      tags: tags,
    })
    const savedQuestion = await question.save()
    console.log('question saved')
    // console.log(submission.testCases)
    let sr = 1
    const TCs = submission.testCases.map(async (test) => {
      const tsID = uuidv4()
      const testCaseInstance = new TestCases({
        TestCaseId: tsID,
        serial: sr,
        input: test.input,
        expectedOutput: test.output,
      })
      sr++
      const QuestionTestcase = new QuestionTest({
        question_id: Qid,
        TestCaseId: tsID,
      })
      await testCaseInstance.save()
      console.log('ts saved')
      await QuestionTestcase.save()
      console.log('qts saved')
      return testCaseInstance
    })

    res.status(201).json(savedQuestion)
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message })
  }
})
module.exports = router
