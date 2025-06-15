import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

// Create Context
export const AppContent = createContext();

// App Context Provider
export const AppContextProvider = (props) => {
  // Axios config
  axios.defaults.withCredentials = true;

  // Constants
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // State
  const [isLoggedIn, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null); // ✅ Corrected: use null instead of false

  // Fetch logged-in user data
  const getUserData = async () => {
    try {
      const res = await axios.get(backendUrl + 'api/user/data');
      if (res.data.success) {
        setUserData(res.data.user);
      } else {
        setUserData(null);
        toast.error("Failed to fetch user data");
      }
    } catch (error) {
      console.log("Error fetching user data:", error.message);
      setUserData(null);
    }
  };

  // Check authentication on load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(backendUrl + 'api/auth/is-auth');
        if (res.data.success) {
          setIsLoggedin(true);
          setUserData(res.data.user); // ✅ Set user directly
        } else {
          setIsLoggedin(false);
          setUserData(null);
        }
      } catch (err) {
        console.log("Auth check error:", err.message);
        setIsLoggedin(false);
        setUserData(null);
      }
    };

    checkAuth();
  }, []);

  // Value provided to children
  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData
  };

  return (
    <AppContent.Provider value={value}>
      {props.children}
    </AppContent.Provider>
  );
};

export default AppContent;
