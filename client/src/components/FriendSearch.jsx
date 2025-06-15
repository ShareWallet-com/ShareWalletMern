import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AppContent } from '../context/AppContext';

const FriendSearch = ({ currentUserId }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const {backendUrl} = useContext(AppContent)

  const handleSearch = async () => {
    try {
      const res = await axios.get(backendUrl + `api/friends/search?query=${query}`);
      setResults(res.data);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const sendRequest = async (receiverId) => {
    try {
        console.log('Sending friend request from:', currentUserId, 'to:', receiverId);
      await axios.post(backendUrl + `api/friends/${receiverId}/send-request`, { senderId: currentUserId });
      alert('Friend request sent!');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="mb-2 text-xl font-bold">Find Friends</h2>
      <input
        type="text"
        placeholder="Search name..."
        className="px-2 py-1 border"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch} className="px-2 py-1 ml-2 text-white bg-blue-500">Search</button>

      <ul className="mt-4">
        {results.map(user => (
          <li key={user._id} className="flex items-center justify-between mb-2">
            <span>{user.name}</span>
            <button onClick={() => sendRequest(user._id)} className="px-2 py-1 text-white bg-green-500 rounded">Add Friend</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendSearch;
