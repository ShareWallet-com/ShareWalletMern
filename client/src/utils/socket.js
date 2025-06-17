// socket.js
import { io } from 'socket.io-client';

let socket = null;

export const connectSocket = (userId) => {
  if (socket) return; // Prevent double connection

  socket = io('https://sharewalletmern-backend.onrender.com', {
    withCredentials: true,
  });

  socket.on('connect', () => {
    console.log('🔌 Connected to Socket.IO:', socket.id);
    socket.emit('register', userId); // Send userId for identification
  });

  socket.on('disconnect', () => {
    console.log('🔌 Disconnected from Socket.IO');
  });
};

export const getSocket = () => {
  if (!socket) {
    console.warn('⚠️ Socket is not connected yet!');
  }
  return socket;
};
