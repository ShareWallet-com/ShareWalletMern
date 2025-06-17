// socket.js
import { io } from 'socket.io-client';

let socket;

export const connectSocket = (userId) => {
  socket = io('https://sharewalletmern-backend.onrender.com', {
    withCredentials: true,
  });

  socket.on('connect', () => {
    console.log('🔌 Connected to Socket.IO:', socket.id);
    socket.emit('register', userId);
  });
};

export const getSocket = () => socket;
