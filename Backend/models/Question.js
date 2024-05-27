import mongoose from 'mongoose'

const QuestionSchema = new mongoose.Schema({
  question_id: { type: String, required: true, unique: true },
  title: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true,
  },
  totalSubmissions: { type: Number, default: 0 },
  WA: { type: Number, default: 0 },
  tags: { type: [String], default: [] },
})

export default mongoose.model('Question', QuestionSchema)
