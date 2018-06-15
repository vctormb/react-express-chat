const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
var mongoose = require('mongoose');
const passport = require('passport');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// models
const OnlineUsers = require('./models/OnlineUsers');

mongoose.connect('mongodb://localhost/katanadb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('db connected')
});

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

/**
 * ROUTES
 */
// app.use('/api/auth', indexRouter);
// app.use('/api/users', usersRouter);

/**
 * SOCKET
 */
io.on('connection', async (socket) => {
  socket.on('join user', async (user) => {
    // add user to db
    const onlineUser = new OnlineUsers({ socketId: socket.id, nickname: user.nickname });
    const addedUser = await onlineUser.save();

    // get online users
    const onlineUsers = await OnlineUsers.find({});

    io.emit('added user', {
      onlineUsers,
    });
  });


  socket.on('disconnect', async () => {
    await OnlineUsers.findOneAndRemove({ socketId: socket.id });

    io.emit('disconnected user', { socketId: socket.id });
  });

  // SEND MESSAGE
  socket.on('chat message', async (msg) => {
    const user = await OnlineUsers.findOne({socketId: socket.id});

    io.emit('chat message', { nickname: user.nickname, message: msg.message });
  });
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
