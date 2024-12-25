const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')
const uniqueIdGenerator = require('../service/unique_id_generation_service')

const UserSchema = new mongoose.Schema({
  _id: { type: String, unique: true },
  Role: { type: String, default: 'User' },
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  registrationDate: { type: Date, default: Date.now },
  DateOfBirth: { type: Date, required: true },
  FullName: { type: String, required: true },
  Bio: { type: String, default: '' },
  ProfilePicture: { type: String, default: '' },
  Rating: { type: Number, default: 0 },
})
UserSchema.plugin(timestamp, {
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
UserSchema.pre('save', async function (next) {
  logger.info('UserSchema pre save called')
  if (!this.isNew) {
    return next();
  }
  try {
    const nextId = await uniqueIdGenerator.getNextUserSequence();
    this._id = `USER${nextId}`;
    next();
  } catch (error) {
    next(error);
  }
});
module.exports = mongoose.model('User', UserSchema)
