const { v4: uuid } = require('uuid')
const QuestionTest = require('../models/QuestionTest')
const TestCases = require('../models/TestCases')
const Submission = require('../models/Submission')
const { generateFile, generateInputFile } = require('../Utils/File')
const {
  executeCpp,
  executeJava,
  executeJavaScript,
  executePython,
} = require('./execute')
const express = require('express')

const router = express.Router()

router.post('/submit', async (req, res) => {
  const sid = uuid()
  const { language = 'cpp', code, UserID, qid } = req.body

  if (!code) {
    return res.status(400).json({ success: false, error: 'Empty code!' })
  }

  try {
    // Ensure question_id is handled as a string
    console.log(`Qid: ${req.body.qid}`)
    // console.log(req.body)
    const questionTests = await QuestionTest.find({ question_id: qid })

    const testCaseIds = questionTests.map((qt) => qt.TestCaseId)
    // console.log('qts', questionTests)

    let failedSerial = 0
    const testCases = await TestCases.find({
      TestCaseId: { $in: testCaseIds },
    })
    for (const testCase of testCases) {
      const { serial, input, expectedOutput } = testCase
      const filePath = await generateFile(language, code)
      const inputPath = await generateInputFile(input)
      // console.log('Input: ', input)

      let output
      switch (language) {
        case 'java':
          output = await executeJava(filePath, inputPath)
          break
        case 'py':
          output = await executePython(filePath, inputPath)
          break
        case 'js':
          output = await executeJavaScript(filePath, inputPath)
          break
        case 'cpp':
          output = await executeCpp(filePath, inputPath)
          break
        default:
          throw new Error('Unsupported language')
      }

      const normalizeString = (str) =>
        str
          .split('\n')
          .map((line) => line.trim())
          .join('\n')
      const normalizedOutput = normalizeString(output)
      const normalizedExpectedOutput = normalizeString(expectedOutput)

      // console.log('Normalized Output: ', normalizedOutput)
      // console.log('Normalized Expected Output: ', normalizedExpectedOutput)

      if (normalizedOutput !== normalizedExpectedOutput) {
        failedSerial = serial
        break
      }
    }

    const verdict = failedSerial
      ? `Failed at test case ${failedSerial}`
      : 'All test cases passed'

    const saveResponse = await Submission.create({
      submission_id: sid,
      question_id: qid,
      user_id: UserID,
      code,
      language,
      verdict,
      dateAndTime: new Date(),
    })

    if (failedSerial) {
      return res.json({
        success: false,
        failedTestCase: failedSerial,
        saveResponse,
      })
    } else {
      return res.json({ success: true, saveResponse })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.toString() })
  }
})

module.exports = router
