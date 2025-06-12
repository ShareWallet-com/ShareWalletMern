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
            const {data} = await axios.get(backendUrl + '/api/auth/is-auth')
            if(data.success) {
                setIsLoggedin(true)
                await getUserData()
            } else {
                setIsLoggedin(false)
                setUserData(false)
            }
        } catch (error) {
            console.log("Auth state error:", error.message)
            setIsLoggedin(false)
            setUserData(false)
        }
    }

    const getUserData = async () => {
  try {
    const res = await axios.get(backendUrl + 'api/user/data', {
      withCredentials: true
    });

    if (res.data.success) {
      setUserData(res.data.user);
    } else {
      console.log("Failed to fetch user:", res.data.message);
      setUserData(false);
    }
  } catch (error) {
    console.log("Error fetching user data:", error.message);
    setUserData(false);
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
