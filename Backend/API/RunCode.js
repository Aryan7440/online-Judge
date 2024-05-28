import express, { urlencoded } from 'express'
// import Question from '../models/Question.js'
import { generateFile } from './generateFile.js'
import { executeCpp } from './executeCPP.js'

const router = express.Router()
router.post('/run', async (req, res) => {
  // const language = req.body.language;
  // const code = req.body.code;

  const { language = 'cpp', code } = req.body
  if (code === undefined) {
    return res.status(404).json({ success: false, error: 'Empty code!' })
  }
  try {
    const filePath = await generateFile(language, code)
    const output = await executeCpp(filePath)
    res.json({ filePath, output })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error })
  }
})
export default router
