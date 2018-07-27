var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    socketId:  { type: String, required: true },
    nickname: String,
});

module.exports = mongoose.model('user', userSchema);