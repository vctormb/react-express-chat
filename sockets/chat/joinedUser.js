const OnlineUsers = require('../../models/OnlineUsers');

module.exports = (io, socket) => {
	socket.on('join user', async (user) => {
		// add user to db
		const onlineUser = new OnlineUsers({ socketId: socket.id, nickname: user.nickname });
		const addedUser = await onlineUser.save();

		// get online users
		const onlineUsers = await OnlineUsers.find({});

		io.emit('user joined', {
			onlineUsers,
		});
	});
}