import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContent = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Always send cookies (very important for auth)
  axios.defaults.withCredentials = true;

  const [isLoggedIn, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

  // ✅ Fetch authenticated user
  const getUserData = async () => {
    try {
      const res = await axios.get(`${backendUrl}api/user/data`, {
        withCredentials: true, // ✅ REQUIRED for cross-origin cookies
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

  // ✅ Check login status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${backendUrl}api/auth/is-auth`, {
          withCredentials: true,
        });

        if (res.data.success) {
          await getUserData(); // ✅ Safe fallback
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
