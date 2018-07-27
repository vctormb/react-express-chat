const mongoose = require('mongoose');
const User = require('../models/User');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
	users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('room', roomSchema);