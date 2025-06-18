import React, { useContext } from 'react';
import FriendSearch from '../components/FriendSearch';
import FriendRequests from '../components/FriendRequests';
import AppContent from '../context/AppContext'; 
const FriendsPage = () => {
  const { userData } = useContext(AppContent);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold text-violet-700">Friend List</h1>
      <FriendSearch currentUserId={userData?._id} />
      <hr className="my-4" />
      <FriendRequests currentUserId={userData?._id} />
    </div>
  );
};

export default FriendsPage;
