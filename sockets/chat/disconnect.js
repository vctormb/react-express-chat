const OnlineUsers = require('../../models/OnlineUsers');

module.exports = (io, socket) => {
    socket.on('disconnect', async () => {
        await OnlineUsers.findOneAndRemove({ socketId: socket.id });

        io.emit('disconnected user', { socketId: socket.id });
    });
}