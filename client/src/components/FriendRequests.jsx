import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { connectSocket, getSocket } from '../utils/socket'; // use getSocket to access socket
import AppContent from '../context/AppContext';

const FriendRequests = () => {
  const { backendUrl, userData } = useContext(AppContent);
  const currentUserId = userData?._id;

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (!currentUserId) return;

    connectSocket(currentUserId); // Connect once per user

    const fetchRequests = async () => {
      try {
        const res = await axios.get(`${backendUrl}api/user/data`, {
          withCredentials: true,
        });

        const friendRequests = res.data.user?.friendRequests || [];
        setRequests(friendRequests);
      } catch (error) {
        console.error('Error fetching user:', error);
        setRequests([]);
      }
    };

    fetchRequests();
  }, [currentUserId, backendUrl]);

  useEffect(() => {
    const socket = getSocket(); // ✅ Always use getSocket after connect

    if (!socket || !currentUserId) return;

    const handleReceived = (data) => {
      setRequests(prev => [...prev, data]);
    };

    const handleAccepted = (data) => {
      toast.success(`${data.name} accepted your friend request!`);
    };

    socket.on('friend_request_received', handleReceived);
    socket.on('friend_request_accepted', handleAccepted);

    return () => {
      socket.off('friend_request_received', handleReceived);
      socket.off('friend_request_accepted', handleAccepted);
    };
  }, [currentUserId]);

  const acceptRequest = async (senderId) => {
    try {
      await axios.post(
        `${backendUrl}api/friends/${senderId}/accept-request`,
        { receiverId: currentUserId },
        { withCredentials: true }
      );

      toast.success('Friend request accepted!');
      setRequests(prev => prev.filter(req => req._id !== senderId));
    } catch (error) {
      console.error('Accept error:', error);
      toast.error(error?.response?.data?.message || 'Error accepting request');
    }
  };

  return (
    <div className="p-4">
      <h2 className="mb-2 text-xl font-bold">Friend Requests</h2>

      {!currentUserId ? (
        <p className="text-red-600">Please log in to view your friend requests.</p>
      ) : requests.length === 0 ? (
        <p>No friend requests</p>
      ) : (
        <ul>
          {requests.map(user => (
            <li key={user._id} className="flex items-center justify-between mb-2">
              <span>{user.name}</span>
              <button
                onClick={() => acceptRequest(user._id)}
                className="px-2 py-1 text-white bg-blue-600 rounded"
              >
                Accept
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendRequests;
