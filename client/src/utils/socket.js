

import io from 'socket.io-client';

const BASE_URL = process.env.NODE_ENV === 'development' ? 'localhost:5000' : 'https://react-chat-express.herokuapp.com/'
const socket = io(BASE_URL);

socket.on('connect', (e) => {
    socket.on('disconnect', () => {
        console.log("client disconnected");
    });
});

export default socket;