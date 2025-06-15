import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
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
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      setUserData(null);
      setIsLoggedin(false);
    }
  };

  useEffect(() => {
    getUserData();
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
      {props.children}
    </AppContent.Provider>
  );
};
