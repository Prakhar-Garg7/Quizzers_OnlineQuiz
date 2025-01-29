const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    questions:[{
        question: {type: String},
        options:[{desc: {type: String}}],
        correctAnswer:{type: Number}
    }]
});

const Quiz = mongoose.model('Quiz', schema);

module.exports = Quiz;
