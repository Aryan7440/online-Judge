import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  Userid: mongoose.Schema.Types.ObjectId,
  Role: { type: String, default: 'User' },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  registrationDate: { type: Date, default: Date.now },
  DateOfBirth: { type: Date, required: true },
  FullName: { type: String, required: true },
  Bio: { type: String, default: '' },
  ProfilePicture: { type: String, default: '' },
  Rating: { type: Number, default: 0 },
})

export default mongoose.model('User', UserSchema)
