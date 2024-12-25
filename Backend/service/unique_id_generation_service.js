const SequenceCounter = require('../models/Sequence_Counter')


exports.getNextQuestionSequence = async function () {
    const query = { name: "Counter" };
    const update = { $inc: { question_sequence: 1 } };
    const options = { new: true, upsert: true };
    const doc = await SequenceCounter.findOneAndUpdate(query, update, options);
    return doc.question_sequence;
}
exports.getNextUserSequence = async function () {
    const query = { name: "Counter" };
    const update = { $inc: { user_sequence: 1 } };
    const options = { new: true, upsert: true };
    const doc = await SequenceCounter.findOneAndUpdate(query, update, options);
    return doc.user_sequence;
}