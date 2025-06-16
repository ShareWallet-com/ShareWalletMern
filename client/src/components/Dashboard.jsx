import React, { useContext } from 'react'
import { AppContent } from '../context/AppContext';
import Navbar from './Navbar';
import FriendsPage from '../pages/Friends';
import FriendsList from './FriendsList';

function Dashboard() {
  const { userData } = useContext(AppContent);
return (
  <>
    <div>
      <Navbar/>
    </div>
    
    <div className="flex flex-row items-center justify-around bg-gray-100 h-[90vh]">
      <div className="p-6 text-center bg-white shadow-xl rounded-2xl">
        <h2 className="mb-6 text-lg text-gray-600">Soon We Launch</h2>
      </div>
      <div className='bg-white shadow-xl rounded-2xl'>
        <FriendsPage/>
        <FriendsList/>
      </div>
      
    </div>
  </>
)
}

export default Dashboard