const mongoose = require('mongoose');
const problemSetSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Link: {
        type: String,
        required: true
    },
    Solved: {
        type: Boolean,
        default: false
    }
})
const problemSet = mongoose.model('problemSet', problemSetSchema);
module.exports = problemSet;