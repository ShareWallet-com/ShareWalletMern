import { io } from 'socket.io-client';

let socket = null;

export const connectSocket = (userId) => {
  if (socket) return; // Avoid reconnecting

  socket = io('https://sharewalletmern-backend.onrender.com', {
    withCredentials: true,
  });

  socket.on('connect', () => {
    socket.emit('register', userId); // Notify server of this user
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
