const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')
const uniqueIdGenerator = require('../service/unique_id_generation_service')

const QuestionSchema = new mongoose.Schema({
  _id: { type: String, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true,
  },
  total_submissions: { type: Number, default: 0 },
  WA: { type: Number, default: 0 },
  tags: { type: [String], default: [] },
  test_case_seq: { type: Number, default: 1000 }
})


QuestionSchema.plugin(timestamp, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})

QuestionSchema.pre('save', async function (next) {
  if (!this.isNew) {
    next();
  }
  const nextId = await uniqueIdGenerator.getNextQuestionSequence();
  this._id = `Q${nextId}`;
  next();
})
module.exports = mongoose.model('Question', QuestionSchema)
