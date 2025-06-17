import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AppContent from '../context/AppContext';
import { connectSocket } from '../utils/socket';

const FriendsList = () => {
  const { backendUrl, userData, getUserData } = useContext(AppContent);
  const [friends, setFriends] = useState([]);

  const currentUserId = userData?._id;

  // ✅ Initial Fetch of Friends
  useEffect(() => {
    if (!currentUserId) return;

    const fetchFriends = async () => {
      try {
        const res = await axios.get(`${backendUrl}api/user/data`, {
          withCredentials: true,
        });

        const friendList = res.data.user?.friends || [];

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
  }, [currentUserId, backendUrl]);

  // ✅ Realtime: Listen for new accepted friend requests
  useEffect(() => {
    if (!currentUserId) return;

    const handleAccepted = (data) => {
      if (!data || !data._id) return;

      setFriends((prev) => {
        const exists = prev.find(f => f._id === data._id);
        if (exists) return prev; // Avoid duplicates
        return [...prev, data];
      });
    };

    connectSocket.on('friend_request_accepted', handleAccepted);

    return () => {
      connectSocket.off('friend_request_accepted', handleAccepted);
    };
  }, [currentUserId]);

  // (Optional) Realtime: If a friend removes you
  useEffect(() => {
    if (!currentUserId) return;

    const handleRemoved = (removedUserId) => {
      setFriends(prev => prev.filter(friend => friend._id !== removedUserId));
    };

    connectSocket.on('friend_removed', handleRemoved);

    return () => {
      connectSocket.off('friend_removed', handleRemoved);
    };
  }, [currentUserId]);

  // ✅ Remove Friend Locally and Emit Live Update
  const handleRemoveFriend = async (friendId) => {
    try {
      await axios.delete(`${backendUrl}api/friends/${friendId}/remove`, {
        withCredentials: true,
      });

      setFriends(prev => prev.filter(friend => friend._id !== friendId));

      // (Optional) Notify friend their connection is removed
      connectSocket.emit('friend_removed_notify', {
        removerId: currentUserId,
        removedId: friendId,
      });

      await getUserData(); // Optional if context is needed elsewhere
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
            <li
              key={friend._id}
              className="flex items-center justify-between pb-1 border-b"
            >
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
