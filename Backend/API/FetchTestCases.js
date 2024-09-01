const express = require('express')
const { v4: uuid } = require('uuid')
const QuestionTest = require('../models/QuestionTest')
const TestCases = require('../models/TestCases')
const Submission = require('../models/Submission')

//6799af26-95d4-4d62-8142-8f3cb9b256f7
const router = express.Router()
router.get('/fetchTestCases', async (req, res) => {
  const { qid } = req.body
  if (!qid) {
    return res.status(400).json({ success: false, error: 'Empty qid!' })
  }

  try {
    console.log(`Qid: ${qid}`)

    const questionTests = await QuestionTest.find({ question_id: qid })
    console.log('qts', questionTests)
    const testCaseIds = questionTests.map((qt) => qt.TestCaseId)
    console.log('testcaseids', testCaseIds)
    const testCases = await TestCases.find({ TestCaseId: { $in: testCaseIds } })
    console.log('testcases', testCases)
    return res.status(200).json({ success: true, data: testCases })
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
})
module.exports = router
