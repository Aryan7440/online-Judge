const mongoose = require('mongoose')

const QuestionTestSchema = new mongoose.Schema({
  question_id: { type: String, required: true, unique: false },
  TestCaseId: { type: String, required: true, unique: false },
})
exports = mongoose.model('QuestionTest', QuestionTestSchema)
