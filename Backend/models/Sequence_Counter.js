
const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const SequenceCounterSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, default: 'Counter', enum: ['Counter'] },
        question_sequence: { type: Number, default: 10000 },
        user_sequence: { type: Number, default: 100000 },
    },
    { _id: false }
)
SequenceCounterSchema.plugin(timestamp,
    {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
)

module.exports = mongoose.model('SequenceCounter', SequenceCounterSchema);


