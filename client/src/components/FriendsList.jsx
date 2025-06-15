import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AppContent from '../context/AppContext';

const FriendsList = () => {
  const { backendUrl, userData } = useContext(AppContent);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (!userData?._id) return;

    const fetchFriends = async () => {
      try {
        const res = await axios.get(`${backendUrl}api/user/data`, {
          withCredentials: true,
        });

        // Check and set friends array
        const friendList = res.data.user?.friends || [];
        setFriends(friendList);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();
  }, [userData, backendUrl]);

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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendsList;
