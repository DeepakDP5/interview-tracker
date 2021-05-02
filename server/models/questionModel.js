const mongoose = require('mongoose');
const questionSchema = mongoose.Schema({
    title: {
        type: String,
    },
    topic: {
        type: String,
    },
    link: {
        type: String,
        required: [true, "Enter Link"],
    },
    description: {
        type: String,
    }
});
const Question = mongoose.model('question', questionSchema);
module.exports = Question;