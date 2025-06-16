import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
// import shareWalletLogo from '../assets/ShareWalletLogo.png'

const Navbar = () => {
    const navigate = useNavigate()
    const {userData , backendUrl, setUserData,setIsLoggedin} = useContext(AppContent);

    const sendVerificationOtp = async()=>{
      try {
          axios.defaults.withCredentials = true;

          const {data} = await axios.post(backendUrl + 'api/auth/send-verify-otp' , {
          email: userData.email.trim().toLowerCase(), 
      })

          if(data.success){
            navigate('/email-verify')
            toast.success(data.message)
            console.log(data.message);
            
          }else{
            toast.error(data.message)
            console.log(data.message);
            
          }
      } catch (error) {
        console.log(error);
      }
    }

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
  {/* Logo on Left */}
  <div>
  <img
    src="https://ik.imagekit.io/sharewallet/Group%2068.png?updatedAt=1749847778836"
    alt="Logo"
    className="hidden w-auto h-10 sm:block"
  />

  {/* Mobile Logo */}
  <img
    src="https://ik.imagekit.io/sharewallet/Group%2076.png?updatedAt=1749897228344"
    alt="Mobile Logo"
    className="block w-auto h-10 sm:hidden"
  />
</div>

  {userData ? " " :
       <ul className='hidden gap-8 sm:flex'>
      <li className='cursor-pointer'>Key Features</li>
      <li className='cursor-pointer'>Explore</li>
      <li className='cursor-pointer'>About</li>
      <li className='cursor-pointer'>Contact</li>
    </ul>
  }
   
  {/* User Avatar or Login on Right */}
  <div>
    {userData ? (
      <div className='relative flex items-center justify-center w-8 h-8 text-white bg-black rounded-full group'>
        <p className="mb-4 text-2xl font-medium">
          Hey {userData ? userData.name : " "}, Welcome to <span className="text-indigo-600">ShareWallet</span>
        </p>
        {userData.name[0].toUpperCase()}
        <div className='absolute top-0 right-0 z-10 hidden pt-10 text-black rounded group-hover:block'>
          <ul className='p-2 m-0 text-sm list-none bg-gray-100'>
            {!userData.isVerified && (
              <li onClick={sendVerificationOtp} className='px-2 py-1 cursor-pointer hover:bg-gray-200'>Verify email</li>
            )}
            <li onClick={logout} className='px-2 py-1 pr-10 cursor-pointer hover:bg-gray-200'>Logout</li>
          </ul>
        </div>
      </div>
    ) : (<>
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


            
    
        </>
      
    )}
  </div>
</div>


  )
}

export default Navbar