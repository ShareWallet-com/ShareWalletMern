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
        <h1 className="text-2xl font-bold ">
          Hey {userData ? userData.name : " "}, Welcome to <span className="text-indigo-600">ShareWallet</span>
        </h1>
        <h2 className="mb-6 text-lg text-gray-600">Soon We Launch</h2>
        {/* <button className="px-6 py-2 text-white transition bg-indigo-600 rounded-full hover:bg-indigo-700">
          Get Started
        </button> */}
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