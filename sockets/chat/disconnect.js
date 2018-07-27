const User = require('../../models/User');

module.exports = (io, socket) => {
    socket.on('disconnect', async () => {
        await User.findOneAndRemove({ socketId: socket.id });

        io.emit('disconnected user', { socketId: socket.id });
    });
}