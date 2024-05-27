import express, { urlencoded } from 'express'
import Question from '../models/Question.js'

const router = express.Router()
router.get('/fetchQuestions', async (req, res) => {
  try {
    const questions = await Question.find()
    res.json(questions)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
router.get('/questions/:questionID', async (req, res) => {
  const qid = req.params.question_id
  try {
    const question = await Question.findByID(qid)
    if (question == null) {
      return res.status(404).json({ message: 'Cannot find question' })
    }
    res.json(question)
  } catch (error) {
    return res.status(500).json({ message: err.message })
  }
})
export default router
