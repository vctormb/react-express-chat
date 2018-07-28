const User = require('../../models/User');

module.exports = (io, socket) => {
    socket.on('disconnect', async () => {
				const userToRemove = await User.findOne({ socketId: socket.id });
        await User.findOneAndRemove({ socketId: socket.id });

        io.emit('disconnected user', { userId: userToRemove._id });
    });
}