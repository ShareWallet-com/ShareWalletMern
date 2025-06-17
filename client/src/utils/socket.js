import { useContext } from 'react';
import { AppContent } from '../context/AppContext';
import { io } from 'socket.io-client';

export const useSocket = () => {
  const { userData } = useContext(AppContent);

  const socket = io('https://your-backend', {
    withCredentials: true,
    query: {
      userId: userData?._id,
    },
  });

  return socket;
};
