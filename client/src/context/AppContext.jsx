import axios from "axios";
import { createContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";


export const AppContent = createContext()

export const AppContextProvider = (props)=>{

  axios.defaults.withCredentials = true;

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [isLoggedIn, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(false);
    
    const getAuthState = async () => {
        try {
          axios.defaults.withCredentials = true;
            const {data} = await axios.get(backendUrl + '/api/auth/is-auth')
            if(data.success) {
                setIsLoggedin(true)
                getUserData()
            }
        } catch (error) {
            toast.error(error.message)
            
        }
    }

    const getUserData = async () => {
  try {
    axios.defaults.withCredentials = true;
    const res = await axios.get(backendUrl + '/api/user/data', {
      withCredentials: true
    });

    if (res.data.success) {
      setUserData(res.data.user);  // ✅ This should be called
    } else {
      console.log("Failed to fetch user:", res.data.message);
    }
  } catch (error) {
    console.log("Error fetching user data:", error.message);
  }
};
    useEffect(() => {
        getAuthState();
    },[])

    const value = {
        backendUrl,
        isLoggedIn, setIsLoggedin,
        userData, setUserData,
        getUserData
    }


    return(
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}
export default AppContent;
