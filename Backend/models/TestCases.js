const mongoose = require('mongoose')
const Question = require('./Question')
const testcasesSchema = new mongoose.Schema({
  testCaseId: { type: String, unique: true },
  question_id: { type: String, ref: 'Question', required: true },
  input: { type: String, required: true },
  expectedOutput: { type: String, required: true },
})
testcasesSchema.pre('save', async function (next) {
  if (!this.isNew) {
    next();
  }
  const qid = this.question_id;
  const tc = await Question.findByIdAndUpdate(qid, { $inc: { test_case_seq: 1 } }, { new: true });
  this.testCaseId = `${qid}TC${tc.test_case_seq}`;
  next();
});
module.exports = mongoose.model('TestCases', testcasesSchema)
