import React, { useEffect, useContext } from 'react';
import { connectSocket, getSocket } from '../socket';
import { AppContent } from '../context/AppContext';
import { toast } from 'react-toastify';

function Dashboard() {
  const { userData } = useContext(AppContent); // userData should have _id

  useEffect(() => {
    if (userData?._id) {
      connectSocket(userData._id); // Connect only once per user
    }
  }, [userData]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    // ✅ Listen for events
    socket.on('friend-request', (data) => {
      console.log('📬 New friend request:', data);
      toast.info(`🔔 Friend Request from ${data.senderName}`);
    });

    socket.on('friend-accepted', (data) => {
      console.log('✅ Friend request accepted:', data);
      toast.success(`🎉 ${data.name} accepted your friend request`);
    });

    // Cleanup
    return () => {
      socket.off('friend-request');
      socket.off('friend-accepted');
    };
  }, [userData]);

  return <div>Welcome to Dashboard</div>;
}

export default Dashboard;
