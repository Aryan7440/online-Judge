import express, { urlencoded } from 'express'
// import Question from '../models/Question.js'
import { generateFile, generateInputFile } from '../Utils/File.js'
import { v4 as uuid } from 'uuid'
import {
  executeCpp,
  executeJava,
  executeJavaScript,
  executePython,
} from './execute.js'

const router = express.Router()
router.post('/run', async (req, res) => {
  const { language = 'cpp', code, input } = req.body
  if (code === undefined) {
    return res.status(404).json({ success: false, error: 'Empty code!' })
  }
  try {
    const jobID = uuid()
    const filePath = await generateFile(language, code, jobID)
    const inputPath = await generateInputFile(input, jobID)
    console.log(inputPath)
    if (language === 'java') {
      const output = await executeJava(filePath, inputPath)
      res.json({ filePath, output })
    } else if (language === 'py') {
      const output = await executePython(filePath, inputPath)
      res.json({ filePath, output })
    } else if (language === 'js') {
      const output = await executeJavaScript(filePath, inputPath)
      res.json({ filePath, output })
    } else if (language === 'cpp') {
      const output = await executeCpp(filePath, inputPath)
      res.json({ filePath, output })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error })
  }
})

export default router
