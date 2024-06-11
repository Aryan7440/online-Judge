import mongoose from 'mongoose'

const QuestionTestSchema = new mongoose.Schema({
  question_id: { type: String, required: true, unique: false },
  TestCaseId: { type: String, required: true, unique: false },
})
export default mongoose.model('QuestionTest', QuestionTestSchema)
