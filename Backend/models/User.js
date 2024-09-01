const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  ID: { type: String, unique: true, sparse: true },
  Role: { type: String, default: 'User' },
  username: { type: String, unique: true, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  registrationDate: { type: Date, default: Date.now },
  DateOfBirth: { type: Date, required: true },
  FullName: { type: String, required: true },
  Bio: { type: String, default: '' },
  ProfilePicture: { type: String, default: '' },
  Rating: { type: Number, default: 0 },
})

module.exports = mongoose.model('User', UserSchema)
