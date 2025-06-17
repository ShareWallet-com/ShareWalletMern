import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AppContent from '../context/AppContext';
import socket from '../utils/socket';

const FriendsList = () => {
  const { backendUrl, userData, getUserData } = useContext(AppContent);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (!userData?._id) return;

    const fetchFriends = async () => {
      try {
        const res = await axios.get(`${backendUrl}api/user/data`, {
          withCredentials: true,
        });

        const friendList = res.data.user?.friends || [];

        // ✅ Remove duplicates by _id
        const uniqueFriends = friendList.filter(
          (friend, index, self) =>
            index === self.findIndex(f => f._id === friend._id)
        );

        setFriends(uniqueFriends);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();
  }, [userData, backendUrl]);

  useEffect(() => {
  if (!userData?._id) return;

  socket.on('friend_request_accepted', (data) => {
    setFriends(prev => [...prev, data]);
  });

  return () => socket.off('friend_request_accepted');
}, [userData]);

  // ✅ Handle friend removal
  const handleRemoveFriend = async (friendId) => {
    try {
      await axios.delete(`${backendUrl}api/friends/${friendId}/remove`, {
        withCredentials: true,
      });

      // 🔄 Update friend list after removal
      setFriends(prev => prev.filter(friend => friend._id !== friendId));
      await getUserData();
    } catch (error) {
      console.error("Failed to remove friend:", error);
      alert("Failed to remove friend");
    }
  };

  return (
    <div className="p-4">
      <h2 className="mb-2 text-xl font-bold">Your Friends</h2>

      {friends.length === 0 ? (
        <p>You have no friends yet.</p>
      ) : (
        <ul className="space-y-2">
          {friends.map(friend => (
            <li key={friend._id} className="flex items-center justify-between pb-1 border-b">
              <span>{friend.name}</span>
              <button
                onClick={() => handleRemoveFriend(friend._id)}
                className="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendsList;
