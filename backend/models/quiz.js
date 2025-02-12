const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    startTime:{type: Date},
    duration:{type: Number},
    questions:[{
        question: {type: String},
        options:[{desc: {type: String}}],
        correctAnswer:{type: Number},
        imageUrl:{type: String}
    }],
    creator:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:"User",
        required:true
    }
});

const Quiz = mongoose.model('Quiz', schema);

module.exports = Quiz;
