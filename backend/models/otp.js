const mongoose = require('mongoose');

// Define the schema
const schema = new mongoose.Schema({
    otp:{type: Number},
    email: { type: String, required: true, unique: true },
});

// Create the model
const OTP = mongoose.model('OTP', schema);

module.exports = OTP;
