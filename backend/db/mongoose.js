const mongoose = require("mongoose");
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/quizzers'

const options = {};
mongoose.connect(MONGODB_URL, options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', function(){
    console.log("connected to Mogodb")
})

module.exports = db;