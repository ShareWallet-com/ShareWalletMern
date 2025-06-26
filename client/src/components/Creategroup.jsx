import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CreateGroup = ({ currentUser }) => {
  const [friends, setFriends] = useState([]);
  const [selected, setSelected] = useState([]);
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    const fetchFriends = async () => {
      const res = await axios.get(`/api/friends/${currentUser._id}`);
      setFriends(res.data.friends); // Adjust based on your API
    };
    fetchFriends();
  }, []);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const handleCreate = async () => {
    if (!groupName || selected.length < 2) return alert('Provide group name and at least 2 members');

    await axios.post('/api/groups/create', {
      name: groupName,
      memberIds: [...selected, currentUser._id],
      createdBy: currentUser._id,
    });

    alert('Group Created!');
    setGroupName('');
    setSelected([]);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-xl">
      <h2 className="mb-2 text-xl font-bold">Create Group</h2>
      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        className="w-full p-2 mb-3 border"
      />
      <div className="grid grid-cols-2 gap-2 overflow-y-auto max-h-40">
        {friends.map((friend) => (
          <div
            key={friend._id}
            onClick={() => toggleSelect(friend._id)}
            className={`p-2 border rounded cursor-pointer ${
              selected.includes(friend._id) ? 'bg-blue-100' : ''
            }`}
          >
            {friend.name}
          </div>
        ))}
      </div>
      <button
        className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
        onClick={handleCreate}
      >
        Create
      </button>
    </div>
  );
};

export default CreateGroup;
