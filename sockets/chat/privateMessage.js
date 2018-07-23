const OnlineUsers = require('../../models/OnlineUsers');

module.exports = (io, socket) => {
	socket.on('send private message', async (msg) => {
		const emitterUser = await OnlineUsers.findOne({ socketId: socket.id });
		const receiverUser = await OnlineUsers.findById(msg.receiverId);

		const messageToReceiver = {
			emmiterId: emitterUser._id,
			nickname: emitterUser.nickname,
			message: msg.message,
		}

		// sending to individual socketid (private message)
		socket.to(receiverUser.socketId).emit('receive private message', messageToReceiver);
	});
}