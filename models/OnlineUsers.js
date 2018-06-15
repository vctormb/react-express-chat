var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var onlineUsersSchema = new Schema({
    socketId:  { type: String, required: true },
    nickname: String,
});

module.exports = mongoose.model('online_users', onlineUsersSchema);