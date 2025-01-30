const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    token:{type: String},
    email: { type: String, required: true },
    sub:{type:String, required: true,default:"EmailVerification"},
    createdAt: { type: Date, default: Date.now, expires: 45 },
});

const Token = mongoose.model('Token', schema);

module.exports = Token;
