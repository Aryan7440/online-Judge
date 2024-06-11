import express from 'express'
import { v4 as uuid } from 'uuid'
import QuestionTest from '../models/QuestionTest.js'
import TestCases from '../models/TestCases.js'
import Submission from '../models/Submission.js'
import { generateFile, generateInputFile } from '../Utils/File.js'
import {
  executeCpp,
  executeJava,
  executeJavaScript,
  executePython,
} from './execute.js'

const router = express.Router()

router.post('/submit', async (req, res) => {
  const sid = uuid()
  const { language = 'cpp', code, UserID, qid } = req.body

  if (!code) {
    return res.status(400).json({ success: false, error: 'Empty code!' })
  }

  try {
    // Ensure question_id is handled as a string
    console.log(`Qid: ${qid}`)
    const questionTests = await QuestionTest.find({ question_id: qid })

    const testCaseIds = questionTests.map((qt) => qt.TestCaseId)
    console.log('qts', questionTests)

    let failedSerial = 0

    for (const testCaseId of testCaseIds) {
      // Ensure TestCaseId is queried as a string
      const testCase = await TestCases.findOne({ TestCaseId: testCaseId })
      if (!testCase) {
        continue
      }

      const { serial, input, expectedOutput } = testCase
      const filePath = await generateFile(language, code)
      const inputPath = await generateInputFile(input)

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

      if (output.trim() !== expectedOutput.trim()) {
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

export default router
