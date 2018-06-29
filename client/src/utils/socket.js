

import io from 'socket.io-client';

// const socket = io('http://10.11.9.108:9000');
const socket = io('localhost:9000');

socket.on('connect', (e) => {
    socket.on('disconnect', () => {
        console.log("client disconnected");
    });
});

export default socket;