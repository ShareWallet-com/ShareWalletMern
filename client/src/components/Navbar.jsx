import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';

const socket = io('https://sharewalletmern-backend.onrender.com', { withCredentials: true }); 
// 🔁 For production use your deployed backend URL

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent);

  // eslint-disable-next-line no-unused-vars
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (!userData) return;

    socket.on('connect', () => {
      console.log('🔌 Connected to Socket.IO:', socket.id);
    });

    // 🔔 Listen for notification events
    socket.on('notification', (data) => {
      console.log('📬 Notification received:', data);
      setNotification(data.message);
      toast.info(`🔔 ${data.message}`);
    });

    return () => {
      socket.off('notification');
      socket.disconnect();
    };
  }, [userData]);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + 'api/auth/send-verify-otp', {
        email: userData.email.trim().toLowerCase(),
      });

      if (data.success) {
        navigate('/email-verify');
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}api/auth/logout`, {}, {
        withCredentials: true
      });

      if (data.success) {
        setIsLoggedin(false);
        setUserData(null);
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-between w-full px-4 py-2">
      {/* Logo Section */}
      <div>
        <img
          src="https://ik.imagekit.io/sharewallet/Group%2068.png?updatedAt=1749847778836"
          alt="Logo"
          className="hidden w-auto h-10 sm:block"
        />
        <img
          src="https://ik.imagekit.io/sharewallet/Group%2076.png?updatedAt=1749897228344"
          alt="Mobile Logo"
          className="block w-auto h-10 sm:hidden"
        />
      </div>

      {/* Menu Items */}
      {!userData && (
        <ul className="hidden gap-8 sm:flex">
          <li className="cursor-pointer">Key Features</li>
          <li className="cursor-pointer">Explore</li>
          <li className="cursor-pointer">About</li>
          <li className="cursor-pointer">Contact</li>
        </ul>
      )}

      {/* Right Side */}
      <div className="flex items-center justify-center gap-8">
        <p className="text-sm font-medium text-black">
          {userData ? userData.name : ''}
        </p>
        {userData ? (
          <div className="relative flex items-center justify-center w-8 h-8 text-white bg-black rounded-full group">
            {userData.name[0].toUpperCase()}
            <div className="absolute top-0 right-0 z-10 hidden pt-10 text-black rounded group-hover:block">
              <ul className="p-2 m-0 text-sm list-none bg-gray-100">
                {!userData.isVerified && (
                  <li
                    onClick={sendVerificationOtp}
                    className="px-2 py-1 cursor-pointer hover:bg-gray-200"
                  >
                    Verify email
                  </li>
                )}
                <li
                  onClick={logout}
                  className="px-2 py-1 pr-10 cursor-pointer hover:bg-gray-200"
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex flex-row gap-4">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 border-2 border-[#4F47EA] rounded-xl text-sm sm:text-base w-28 sm:w-32"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 border-2 bg-[#4F47EA] text-white rounded-xl text-sm sm:text-base w-28 sm:w-32"
            >
              SignUp
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
