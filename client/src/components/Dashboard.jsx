import { useContext, useEffect } from 'react';
import { AppContent } from '../context/AppContext';
import Navbar from './Navbar';
import FriendsPage from '../pages/Friends';
import FriendsList from './FriendsList';
import { getSocket } from '../utils/socket'; // ⬅️ Only getSocket used here
import { toast } from 'react-toastify';

function Dashboard() {
  const { userData } = useContext(AppContent);

  // ✅ Listen for events (only if socket is connected)
  useEffect(() => {
    const socket = getSocket();

    if (!socket || typeof socket.on !== 'function') {
      console.warn('⚠️ Socket is not ready or invalid:', socket);
      return;
    }

    const handleFriendRequestAccepted = (data) => {
      toast.success(`🎉 ${data.name} accepted your friend request`);
    };

    const handleNewFriend = (data) => {
      toast.info(`🤝 You are now friends with ${data.name}`);
    };

    socket.on('friend_request_accepted', handleFriendRequestAccepted);
    socket.on('new_friend', handleNewFriend);

    return () => {
      socket.off('friend_request_accepted', handleFriendRequestAccepted);
      socket.off('new_friend', handleNewFriend);
    };
  }, [userData?._id]);

  return (
    <>
      <Navbar />

      <div className="flex flex-row items-center justify-around bg-gray-100 h-[90vh]">
        <div className="p-6 text-center bg-white shadow-xl rounded-2xl">
          <h2 className="mb-6 text-lg text-gray-600">Soon We Launch</h2>
        </div>
        <div className="bg-white shadow-xl rounded-2xl">
          <FriendsPage />
          <FriendsList />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
