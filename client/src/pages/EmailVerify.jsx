import React, { useContext, useEffect } from 'react'
import AppContent from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function EmailVerify() {

  axios.defaults.withCredentials = true;
  const {backendUrl,isLoggedIn,userData,getUserData} = useContext(AppContent)
  
  const navigate = useNavigate()
  
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
  const onSubmitHandler = async (e) =>{
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map(e=> e.value)
      const otp = otpArray.join('');
      
      const {data} = await axios.post(backendUrl + '/api/auth/verify-account',{otp})

      if(data.success){
        toast.success(data.message)
        getUserData()
        navigate('/')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      
    }
  }
  
  useEffect(()=>{
    isLoggedIn && userData && userData.isVerified && navigate('/')
  },[isLoggedIn,userData])
  
  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <h1>Email Verify OTP</h1>
        <p>Enter the 6-digit code sent to your email id.</p>
        <div className='flex justify-between mb-8' onPaste={handlePaste}>
          {Array(6).fill(0).map((_,index)=>(
            <input type="text" maxLength='1' key={index} required className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md'
            ref={e => inputRefs.current[index] = e}
            onInput={(e) => handleInput(e,index)}
            onKeyDown={(e) => handleKeyDown(e,index)}
            /> 
          ))}
        </div>
        <button >Verify email</button>
      </form>
    </div>
  )
}

export default EmailVerify