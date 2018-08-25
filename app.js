const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const keys = require('./config/keys');

mongoose.connect(keys.mongoUri);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('db connected')
});

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * SOCKET
 */
io.on('connection', async (socket) => {
	require('./sockets/chat/joinedUser')(io, socket);
	require('./sockets/chat/chatMessage')(io, socket);
	require('./sockets/chat/disconnect')(io, socket);
	require('./sockets/chat/privateMessage')(io, socket);
	require('./sockets/chat/joinPrivateRoom')(io, socket);
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// send error
	res.status(err.status || 500).send(err);
});

module.exports = { app, server };
