import React, { useState, useContext } from 'react';
import { AppContent } from '../context/AppContext';
import axios from 'axios';

const FriendSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const { backendUrl, userData } = useContext(AppContent);
  const currentUserId = userData?._id;

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const res = await axios.get(`${backendUrl}api/friends/search?query=${query}`);
      setResults(res.data);
    } catch (error) {
      console.error('Search error:', error);
      alert('Error searching users');
    }
  };

  const sendRequest = async (receiverId) => {
    if (!currentUserId) {
      alert("You're not logged in.");
      return;
    }

    console.log('Sending friend request from:', currentUserId, 'to:', receiverId);
    try {
      await axios.post(`${backendUrl}api/friends/${receiverId}/send-request`, {
        senderId: currentUserId,
      });
      alert('Friend request sent!');
    } catch (error) {
      alert(error?.response?.data?.message || 'Request failed');
    }
  };

  return (
    <div className="p-4">
      <h2 className="mb-2 text-xl font-bold">Find Friends</h2>

      {!currentUserId && <p className="text-red-600">Please log in to search and add friends.</p>}

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search name..."
          className="px-2 py-1 border rounded"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch} className="px-2 py-1 text-white bg-blue-500 rounded">
          Search
        </button>
      </div>

      <ul className="mt-4">
        {results.map(user => (
          <li key={user._id} className="flex items-center justify-between mb-2">
            <span>{user.name}</span>
            <button
              onClick={() => sendRequest(user._id)}
              className="px-2 py-1 text-white bg-green-500 rounded"
            >
              Add Friend
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendSearch;
