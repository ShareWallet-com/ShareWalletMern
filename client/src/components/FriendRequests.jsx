import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AppContent from '../context/AppContext';

const FriendRequests = ({ currentUserId }) => {
    const {backendUrl} = useContext(AppContent)
  const [requests, setRequests] = useState([]);


useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get(backendUrl + ` api/users/${currentUserId}`);
      setRequests(res.data.friendRequests || []); // fallback to empty array
    } catch (error) {
      console.error('Error fetching user:', error);
      setRequests([]); // fallback in error case
    }
  };
  fetchUser();
}, [currentUserId, backendUrl]);


  const acceptRequest = async (senderId) => {
    try {
      await axios.post( backendUrl + `api/friends/${senderId}/accept-request`, {
        receiverId: currentUserId,
      });
      alert('Friend request accepted!');
      setRequests(requests.filter(id => id !== senderId));
    } catch (error) {
      alert(error.message,'Error accepting request');
    }
  };

  return (
    <div className="p-4">
      <h2 className="mb-2 text-xl font-bold">Friend Requests</h2>
      {requests.length === 0 ? (
      <p>No friend requests</p>
    ) :(
        <ul>
        {requests.map(id => (
          <li key={id} className="flex items-center justify-between mb-2">
            <span>User ID: {id}</span>
            <button onClick={() => acceptRequest(id)} className="px-2 py-1 text-white bg-blue-600 rounded">Accept</button>
          </li>
        ))}
      </ul>
    )}
      
    </div>
  );
};

export default FriendRequests;
