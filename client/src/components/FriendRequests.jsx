import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AppContent from '../context/AppContext';

const FriendRequests = () => {
  const { backendUrl, userData } = useContext(AppContent);
  const currentUserId = userData?._id;

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (!currentUserId) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${backendUrl}api/users/${currentUserId}`);
        setRequests(res.data.friendRequests || []);
      } catch (error) {
        console.error('Error fetching user:', error);
        setRequests([]);
      }
    };

    fetchUser();
  }, [currentUserId, backendUrl]);

  const acceptRequest = async (senderId) => {
    try {
      await axios.post(`${backendUrl}api/friends/${senderId}/accept-request`, {
        receiverId: currentUserId,
      });
      alert('Friend request accepted!');
      setRequests((prev) => prev.filter(id => id !== senderId));
    } catch (error) {
      console.error('Accept error:', error);
      alert(error?.response?.data?.message || 'Error accepting request');
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
          {requests.map(id => (
            <li key={id} className="flex items-center justify-between mb-2">
              <span>User ID: {id}</span>
              <button
                onClick={() => acceptRequest(id)}
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
