const OnlineUsers = require('../../models/OnlineUsers');

module.exports = (io, socket) => {
	socket.on('join user', async (user) => {
		// add user to db
		const onlineUser = new OnlineUsers({ socketId: socket.id, nickname: user.nickname });
		await onlineUser.save();

		// get online users
		const onlineUsers = await OnlineUsers.find({})
			.where('_id').ne(onlineUser._id);

		// send to current request socket client
		socket.emit('user joined', {
			onlineUsers,
		});

		// sending to all clients except sender
		socket.broadcast.emit('new online user', onlineUser);
	});
}