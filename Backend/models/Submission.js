import mongoose from 'mongoose'
const submissionSchema = new mongoose.Schema({
  submission_id: { type: String, required: true, unique: true },
  question_id: { type: String, required: true },
  user_id: { type: String, required: true },
  code: { type: String, required: true },
  language: { type: String, required: true },
  verdict: { type: String, required: true },
  dateAndTime: { type: Date },
})
export default mongoose.model('Submission', submissionSchema)
