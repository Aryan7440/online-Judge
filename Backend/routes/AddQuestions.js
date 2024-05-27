import express from 'express'
import bodyParser from 'body-parser'
import Question from '../models/Question.js'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()
router.use(bodyParser.json())
router.post('/addquestion', async (req, res) => {
  const { title, description, difficulty, tags } = req.body
  console.log('addquestion page entered')
  // console.log(req)
  try {
    const question = new Question({
      question_id: uuidv4(),
      title: title,
      description: description,
      difficulty: difficulty,
      tags: tags,
    })
    const savedQuestion = await question.save()
    console.log('saved')
    res.status(201).json(savedQuestion)
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message })
  }
})
export default router
