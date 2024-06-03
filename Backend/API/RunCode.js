import express, { urlencoded } from 'express'
// import Question from '../models/Question.js'
import { generateFile } from './generateFile.js'
import {
  executeCpp,
  executeJava,
  executeJavaScript,
  executePython,
} from './executeCPP.js'
import { generateInputFile } from './InputCode.js'

const router = express.Router()
router.post('/run', async (req, res) => {
  const { language = 'cpp', code, input } = req.body
  if (code === undefined) {
    return res.status(404).json({ success: false, error: 'Empty code!' })
  }
  try {
    const filePath = await generateFile(language, code)
    const inputPath = await generateInputFile(input)
    console.log(inputPath)
    if (language === 'java') {
      const output = await executeJava(filePath, inputPath)
      res.json({ filePath, output })
    }
    if (language === 'py') {
      const output = await executePython(filePath, inputPath)
      res.json({ filePath, output })
    }
    if (language === 'js') {
      const output = await executeJavaScript(filePath, inputPath)
      res.json({ filePath, output })
    }
    if (language === 'cpp') {
      const output = await executeCpp(filePath, inputPath)
      res.json({ filePath, output })
    }
    // const output = await executeCpp(filePath, inputPath)

    res.json({ filePath, output })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error })
  }
})
export default router
