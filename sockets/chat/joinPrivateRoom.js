const OnlineUsers = require('../../models/OnlineUsers');

module.exports = (io, socket) => {
	socket.on('join private room', async (data) => {
		console.log(data)
		const receiverUser = await OnlineUsers.findById(data.receiverId);

		socket.join('private_room');
	});
}