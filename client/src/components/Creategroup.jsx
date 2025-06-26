import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContent } from '../context/AppContext';

const CreateGroup = () => {
  const { userData, backendUrl } = useContext(AppContent);
  const [friends, setFriends] = useState([]);
  const [selected, setSelected] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userData?._id) return;

    const fetchFriends = async () => {
      try {
        const res = await axios.get(`${backendUrl}api/friends/${userData._id}`);
        setFriends(res.data.friends || []);
      } catch (err) {
        console.error('Error fetching friends', err);
      }
    };

    fetchFriends();
  }, [userData, backendUrl]);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const handleCreate = async () => {
    if (!groupName || selected.length < 2) {
      alert('Please enter a group name and select at least 2 friends.');
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${backendUrl}api/groups/create`, {
        name: groupName,
        memberIds: [...selected, userData._id],
        createdBy: userData._id,
      });
      alert('✅ Group created successfully!');
      setGroupName('');
      setSelected([]);
    } catch (err) {
      console.error('Error creating group:', err);
      alert('❌ Failed to create group.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg p-6 mx-auto mt-8 bg-white shadow-lg rounded-xl">
      <h2 className="mb-4 text-2xl font-bold text-center">Create New Group</h2>

      <input
        type="text"
        placeholder="Enter Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <p className="mb-2 font-semibold text-gray-600">Select Friends:</p>
      <div className="grid grid-cols-2 gap-3 mb-4 overflow-y-auto max-h-48">
        {friends.length > 0 ? (
          friends.map((friend) => (
            <div
              key={friend._id}
              onClick={() => toggleSelect(friend._id)}
              className={`cursor-pointer p-2 rounded border flex items-center justify-between hover:bg-blue-50 ${
                selected.includes(friend._id)
                  ? 'bg-blue-100 border-blue-400'
                  : 'border-gray-300'
              }`}
            >
              <span>{friend.name}</span>
              {selected.includes(friend._id) && (
                <span className="text-sm font-bold text-blue-600">✔</span>
              )}
            </div>
          ))
        ) : (
          <p className="col-span-2 text-sm text-gray-400">
            No friends found to add.
          </p>
        )}
      </div>

      <button
        onClick={handleCreate}
        disabled={loading}
        className="w-full px-4 py-2 font-semibold text-white transition bg-blue-600 rounded hover:bg-blue-700"
      >
        {loading ? 'Creating...' : 'Create Group'}
      </button>
    </div>
  );
};

export default CreateGroup;
