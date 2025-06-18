import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { connectSocket } from '../utils/socket.js';


export const AppContent = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  axios.defaults.withCredentials = true;
  const [isLoggedIn, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    try {
      const res = await axios.get(`${backendUrl}api/user/data`, {
        withCredentials: true, 
      });

      if (res.data.success) {
        setUserData(res.data.user);
        setIsLoggedin(true);
      } else {
        setUserData(null);
        setIsLoggedin(false);
        toast.error("Failed to fetch user");
      }
    } catch (error) {
      console.error("Error fetching user:", error.message);
      setUserData(null);
      setIsLoggedin(false);
    }
  };


useEffect(() => {
  const checkAuth = async () => {
    try {
      const res = await axios.get(`${backendUrl}api/auth/is-auth`, {
        withCredentials: true, 
      });

      if (res.data.success) {
        await getUserData();       
        setIsLoggedin(true);       
      } else {
        setIsLoggedin(false);
        setUserData(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error.message);
      setIsLoggedin(false);
      setUserData(null);
    }
  };

  checkAuth();
}, []);

useEffect(() => {
  if (userData?._id) {
    connectSocket(userData._id);
  }
}, [userData]);

  return (
    <AppContent.Provider
      value={{
        backendUrl,
        isLoggedIn,
        setIsLoggedin,
        userData,
        setUserData,
        getUserData,
      }}
    >
      {children}
    </AppContent.Provider>
  );
};

export default AppContent;
