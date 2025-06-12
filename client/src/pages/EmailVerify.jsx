import React, { useContext, useEffect } from 'react'
import AppContent from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function EmailVerify() {

  axios.defaults.withCredentials = true;
  const { backendUrl, isLoggedIn, userData, getUserData } = useContext(AppContent);
  const navigate = useNavigate();

  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.slice(0, 6).split('');
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const otpArray = inputRefs.current.map((el) => el.value);
      const otp = otpArray.join('');
      console.log("Submitting OTP:", otp);

      const { data } = await axios.post(backendUrl + 'api/auth/verify-account', {
        otp,
        email: userData?.email,  // send email to backend
      });

      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn && userData?.isVerified) {
      navigate('/');
    }
  }, [isLoggedIn, userData]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-900">
      <form
        onSubmit={onSubmitHandler}
        className="bg-[#1F254A] p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h1 className="mb-2 text-2xl font-semibold text-center text-white">
          Email Verification
        </h1>
        <p className="mb-6 text-sm text-center text-gray-300">
          Enter the 6-digit code sent to your email.
        </p>

        <div className="flex justify-between mb-6" onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input
              type="text"
              maxLength="1"
              key={index}
              required
              ref={(el) => (inputRefs.current[index] = el)}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full py-2 font-medium text-white transition-all duration-300 bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Verify Email
        </button>
      </form>
    </div>
  );
}

export default EmailVerify;
