import mongoose from 'mongoose'
// import AutoIncrementFactory from 'mongoose-sequence'

// const AutoIncrement = AutoIncrementFactory(mongoose)
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
// QuestionSchema.plugin(AutoIncrement, { inc_field: 'question_id' })
export default mongoose.model('Question', QuestionSchema)
