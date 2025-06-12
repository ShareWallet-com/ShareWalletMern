import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

// Create context
export const AppContent = createContext();

export const AppContextProvider = (props) => {

  // Axios config
  axios.defaults.withCredentials = true;

  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Should NOT have trailing slash

  const [isLoggedIn, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(false);

  // ✅ 1. Check auth status
  const getAuthState = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`);

      if (data.success) {
        setIsLoggedin(true);
        await getUserData(); // ✅ Await to ensure correct flow
      } else {
        toast.error("User not authenticated");
      }

    } catch (error) {
      toast.error("Auth check failed: " + error.message);
      console.error("Auth check error:", error);
    }
  };

  // ✅ 2. Get user data
  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`, {
        withCredentials: true
      });

      if (data.success) {
        setUserData(data.user);
        console.log("User data:", data.user);
      } else {
        toast.error("Failed to fetch user: " + data.message);
        console.warn("Backend response:", data.message);
      }

    } catch (error) {
      toast.error("Error fetching user data: " + error.message);
      console.error("Axios error:", error);
    }
  };

  // ✅ 3. Run once on mount
  useEffect(() => {
    getAuthState();
  }, []);

  // ✅ 4. Provide values globally
  const value = {
    backendUrl,
    isLoggedIn, setIsLoggedin,
    userData, setUserData,
    getUserData
  };

  return (
    <AppContent.Provider value={value}>
      {props.children}
    </AppContent.Provider>
  );
};

export default AppContent;
