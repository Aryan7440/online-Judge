const express = require('express')
const addQuestionController = require('../controllers/problems/add_questions')
const deleteQuestionController = require('../controllers/problems/delete_question')

const router = express.Router()
router.post('/addQuestion', addQuestionController.addQuestions)
router.delete('/deleteQuestion', deleteQuestionController.deleteQuestion)

module.exports = router
