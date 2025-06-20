import { useContext, useEffect } from 'react';
import { AppContent } from '../context/AppContext';
import Navbar from './Navbar';
import FriendsPage from '../pages/Friends';
import FriendsList from './FriendsList';
import { getSocket } from '../utils/socket';
import { toast } from 'react-toastify';

function Dashboard() {
  const { userData } = useContext(AppContent);

  useEffect(() => {
    if (!userData?._id) return;

    const socket = getSocket();
    if (!socket) return;

    const handleConnect = () => {
      console.log("✅ Socket connected:", socket.id);
    };

    const handleFriendAccepted = (data) => {
      toast.success(`🎉 ${data.name} accepted your friend request`);
    };

    const handleNewFriend = (data) => {
      toast.info(`🤝 You are now friends with ${data.name}`);
    };

    socket.on('connect', handleConnect);
    socket.on('friend_request_accepted', handleFriendAccepted);
    socket.on('new_friend', handleNewFriend);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('friend_request_accepted', handleFriendAccepted);
      socket.off('new_friend', handleNewFriend);
    };
  }, [userData?._id]);

  return (
    <>
      <Navbar />

      <div className="flex flex-col md:flex-row items-center justify-around bg-gray-100 h-[90vh]">
        <div className="p-6 text-center bg-white rounded-2xl">
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
