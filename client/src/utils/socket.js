// src/utils/socket.js
import { io } from 'socket.io-client';

const socket = io('https://sharewalletmern-backend.onrender.com', {
  withCredentials: true,
  query: {
    userId: localStorage.getItem('userId'), // optional
  },
});

export default socket; // ✅ This is a default export
