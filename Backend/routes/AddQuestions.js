import express from 'express'
import bodyParser from 'body-parser'
import Question from '../models/Question.js'

const router = express.Router()
router.use(bodyParser.json())
router.post('/addquestion', async (req, res) => {
  const { title, description, difficulty, tags } = req.body
  console.log('addquestion page entered')
  try {
    const question = new Question({
      title: title,
      description: description,
      difficulty: difficulty,
      tags: tags,
    })
    const savedQuestion = await question.save()
    res.status(201).json(savedQuestion)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})
export default router
