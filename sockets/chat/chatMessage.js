const User = require('../../models/User');

module.exports = (io, socket) => {
    socket.on('chat message', async (msg) => {
        const user = await User.findOne({ socketId: socket.id });

        io.emit('chat message', { nickname: user.nickname, message: msg.message });
    });
}