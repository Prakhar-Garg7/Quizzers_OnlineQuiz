const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    token:{type: Number},
    email: { type: String, required: true, unique: true },
});

const Token = mongoose.model('Token', schema);

module.exports = Token;
