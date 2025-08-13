import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContent } from '../context/AppContext';

const CreateGroup = () => {
  const { userData, backendUrl } = useContext(AppContent);
  const [friends, setFriends] = useState([]);
  const [selected, setSelected] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (!userData?._id) return;

    const fetchFriends = async () => {
      try {
        const res = await axios.get(`${backendUrl}api/friends/list`, {
          withCredentials: true,
        });
        setFriends(res.data.friends || []);
      } catch (err) {
        console.error('Error fetching friends', err);
      }
    };

    fetchFriends();
  }, [userData, backendUrl]);

  const fetchGroups = async () => {
    try {
      const res = await axios.get(`${backendUrl}api/groups/user`, {
        withCredentials: true,
      });
      setGroups(res.data.groups || []);
    } catch (err) {
      console.error('❌ Error fetching groups:', err);
    }
  };

  useEffect(() => {
    if (userData?._id) {
      fetchGroups();
    }
  }, [userData]);

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
      await axios.post(
        `${backendUrl}api/groups/create`,
        {
          name: groupName,
          memberIds: [...selected, userData._id],
          createdBy: userData._id,
        },
        { withCredentials: true }
      );

      alert('✅ Group created successfully!');
      setGroupName('');
      setSelected([]);
      fetchGroups();
    } catch (err) {
      console.error('Error creating group:', err);
      alert('❌ Failed to create group.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (groupId) => {
    if (!window.confirm('Are you sure you want to delete this group?')) {
      return;
    }

    try {
      await axios.delete(`${backendUrl}api/groups/${groupId}`, {
        data: { userId: userData._id },
        withCredentials: true,
      });
      
      alert('🗑️ Group deleted successfully!');
      setGroups((prevGroups) => prevGroups.filter((g) => g._id !== groupId));

    } catch (err) {
      console.error(
        'Error deleting group:',
        err.response?.data || err.message || err
      );
      alert(err.response?.data?.message || '❌ Failed to delete group.');
    }
  };

  return (
    <div className="p-6 mx-auto mt-8 max-w-2xl bg-white rounded-xl shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-center">Create New Group</h2>

      <input
        type="text"
        placeholder="Enter Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        className="p-2 mb-4 w-full rounded border border-gray-300"
      />

      <p className="mb-2 font-semibold text-gray-600">Select Friends:</p>
      <div className="grid overflow-y-auto grid-cols-2 gap-3 mb-4 max-h-48">
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
        className="px-4 py-2 w-full font-semibold text-white bg-blue-600 rounded transition hover:bg-blue-700 disabled:bg-blue-300"
      >
        {loading ? 'Creating...' : 'Create Group'}
      </button>

      <div className="mt-8">
        <h3 className="mb-2 text-xl font-semibold">Your Groups:</h3>
        {groups.length === 0 ? (
          <p className="text-gray-500">You haven’t created any groups yet.</p>
        ) : (
          <ul className="space-y-3">
            {groups.map((group) => (
              <li key={group._id} className="flex justify-between items-center p-4 rounded border shadow-sm">
                <div>
                  <h4 className="font-bold">{group.name}</h4>
                  <p className="text-sm text-gray-600">
                    Members: {group.members.map((m) => m.name).join(', ')}
                  </p>
                </div>
                {userData && group.createdBy?._id === userData._id && (
                  <button
                    onClick={() => handleDelete(group._id)}
                    className="px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded transition hover:bg-red-600"
                    aria-label={`Delete ${group.name} group`}
                  >
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CreateGroup;