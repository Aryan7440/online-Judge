import mongoose from 'mongoose'
const testcasesSchema = new mongoose.Schema({
  TestCaseId: { type: String, required: true, unique: true },
  serial: { type: Number, required: true },
  input: { type: String, required: true },
  expectedOutput: { type: String, required: true },
})
export default mongoose.model('TestCases', testcasesSchema)
