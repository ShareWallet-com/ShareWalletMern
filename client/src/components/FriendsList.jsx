import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContent } from '../context/AppContext';
import { connectSocket, getSocket } from '../utils/socket';

const FriendsList = () => {
  const { backendUrl, userData, getUserData } = useContext(AppContent);
  const [friends, setFriends] = useState([]);

  const currentUserId = userData?._id;

  // ✅ Fetch Populated Friends List from Backend
  const fetchFriends = async () => {
    if (!currentUserId) return;
    try {
      const res = await axios.get(`${backendUrl}api/friends/list`, {
        withCredentials: true,
      });
      setFriends(res.data.friends || []);
    } catch (error) {
      console.error('❌ Error fetching friends:', error);
    }
  };

  // ✅ Connect socket once
  useEffect(() => {
    if (currentUserId) {
      connectSocket(currentUserId);
    }
  }, [currentUserId]);

  // ✅ Initial Fetch
  useEffect(() => {
    fetchFriends();
  }, [currentUserId, backendUrl]);

  // ✅ Realtime: Listen for accepted requests
  useEffect(() => {
    if (!currentUserId) return;
    const socket = getSocket();
    if (!socket) return;

    const handleAccepted = (data) => {
      if (!data || !data._id) return;
      setFriends((prev) => {
        const exists = prev.find(f => f._id === data._id);
        return exists ? prev : [...prev, data];
      });
    };

    socket.on('friend_request_accepted', handleAccepted);
    return () => socket.off('friend_request_accepted', handleAccepted);
  }, [currentUserId]);

  // ✅ Realtime: Removed
  useEffect(() => {
    if (!currentUserId) return;
    const socket = getSocket();
    if (!socket) return;

    const handleRemoved = (removedUserId) => {
      setFriends(prev => prev.filter(friend => friend._id !== removedUserId));
    };

    socket.on('friend_removed', handleRemoved);
    return () => socket.off('friend_removed', handleRemoved);
  }, [currentUserId]);

  // ✅ Remove Friend
  const handleRemoveFriend = async (friendId) => {
    try {
      await axios.delete(`${backendUrl}api/friends/${friendId}/remove`, {
        withCredentials: true,
      });

      setFriends(prev => prev.filter(friend => friend._id !== friendId));

      const socket = getSocket();
      if (socket) {
        socket.emit('friend_removed_notify', {
          removerId: currentUserId,
          removedId: friendId,
        });
      }

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
