const express = require('express')
const { urlencoded } = require('express')
// const Question = require('../models/Question');
const { generateFile, generateInputFile } = require('../Utils/File')
const { v4: uuid } = require('uuid')
const {
  executeCpp,
  executeJava,
  executeJavaScript,
  executePython,
} = require('./execute')

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
    // console.log(error)
    res.status(500).json({ error: error })
  }
})

module.exports = router
