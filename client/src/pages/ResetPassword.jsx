import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppContent from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function ResetPassword() {

  const{backendUrl} = useContext(AppContent)
  axios.defaults.withCredentials = true
  
  const navigate = useNavigate()
  const[email,setEmail] = useState('')
  const[newPassword,setNewPassword] = useState('')
  const [isEmailSent,setIsEmailSent] = useState('')
  const [otp,setOtp] = useState(0)
  const[isOtpSubmited,setisOtpSubmited] = useState(false)
  
  const inputRefs = React.useRef([]);
    
    const handleInput = (e,index) =>{
      if(e.target.value.length > 0 && index < inputRefs.current.length-1 ){
        inputRefs.current[index+1].focus();
      }
    }
    const handleKeyDown = (e,index) =>{
      if(e.key === 'Backspace' && e.target.value.length === 0 && index > 0){
        inputRefs.current[index-1].focus();
      }
    }
    
    const handlePaste = (e)=>{
      const paste = e.clipboardData.getData('text');
      const pasteArray = paste.split('');
      pasteArray.forEach((char,index)=>{
        if(inputRefs.current[index]){
          inputRefs.current[index].value = char;
        }
      })
    }

    const onSubmitEmail = async (e) =>{
      e.preventDefault();
      try {
        const {data} = await axios.post(backendUrl + '/api/auth/send-reset-otp',{email})
        data.success ? toast.success(data.message) : toast.error(data.message)
        data.success && setIsEmailSent(true)
      } catch (error) {
        toast.error(error.message)
      }
    }
    
    const onSubmitOTP = async(e)=>{
      e.preventDefault();
      const otpArray = inputRefs.current.map(e => e.value)
      setOtp(otpArray.join(''))
      setisOtpSubmited(true)
    }
    const onSubmitNewPassword = async (e) =>{
      e.preventDefault();
      try {
        
        const{data} = await axios.post(backendUrl + '/api/auth/reset-password',{email,otp,newPassword})
        data.success ? toast.success(data.message) : toast.error(data.message)
        data.success && navigate('/login')
      } catch (error) {
        toast.error(error.message)
      }
    }
  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
  <div className="w-full max-w-md p-8 text-center bg-white shadow-lg rounded-2xl">
    <div className="flex justify-center w-full mb-2">
      <img src="https://ik.imagekit.io/sharewallet/Group%205.png?updatedAt=1749731462526" alt="Logo" className="w-auto h-12" />
    </div>
    {/* Email Form */}
    {!isEmailSent && (
      <form onSubmit={onSubmitEmail}>
        <h1 className="mb-2 text-2xl font-bold">Reset Password</h1>
        <p className="mb-6 text-sm text-gray-600">Enter your registered email address</p>
        <input
          type="email"
          placeholder="Email ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="w-full py-2 text-white transition bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Submit
        </button>
      </form>
    )}

    {/* OTP Form */}
    {!isOtpSubmited && isEmailSent && (
      <form onSubmit={onSubmitOTP}>
        <h1 className="mb-2 text-2xl font-bold">Enter OTP</h1>
        <p className="mb-6 text-sm text-gray-600">Enter the 6-digit code sent to your email</p>
        <div className="flex justify-between gap-2 mb-6" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                required
                className="w-10 h-12 text-center text-xl rounded-md bg-[#333A5C] text-white focus:outline-none"
                ref={(el) => (inputRefs.current[index] = el)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        </div>
        <button
          type="submit"
          className="w-full py-2 text-white transition bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Submit
        </button>
      </form>
    )}

    {/* New Password Form */}
    {isOtpSubmited && isEmailSent && (
      <form onSubmit={onSubmitNewPassword}>
        <h1 className="mb-2 text-2xl font-bold">Set New Password</h1>
        <p className="mb-6 text-sm text-gray-600">Enter your new password</p>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="w-full py-2 text-white transition bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Submit
        </button>
      </form>
    )}
  </div>
</div>

  )
}

export default ResetPassword