import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import {toast} from 'react-toastify'


function Login() {
    const navigate = useNavigate()

    const {backendUrl,setIsLoggedin,getUserData} = useContext(AppContent)


    const[state,setState] = useState('Sign Up')
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [mobileNumber,setmobileNumber] = useState('')
    const [dateofBirth,setdateofBirth] = useState('')
    const [username,setUsername] = useState('')

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();

            axios.defaults.withCredentials = true;

            if(state === 'Sign Up'){
              const { data }  = await axios.post(backendUrl + 'api/auth/register', {
                name, email, password, mobileNumber, dateofBirth, username
            }, {
                withCredentials: true
            })
            
                if(data.success){
                    setIsLoggedin(true);
                    await getUserData();
                    navigate('/dashboard');
                } else {
                    toast.error(data.message)
                }
            }else{
              const { data }  = await axios.post(backendUrl + 'api/auth/login', {
                email, password
            }, {
                withCredentials: true
            })
                if (data.success) {
                        setIsLoggedin(true);
                        await getUserData();
                        navigate('/dashboard');
                        }
 else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

  return (
    <div className="bg-[#6f6f6f] min-h-screen flex items-center justify-center px-4 py-8">
  <div className="flex flex-col w-full max-w-md gap-6 p-8 bg-white shadow-lg rounded-2xl">
    
    {/* Logo */}
    <div className="flex justify-center w-full mb-2">
      <img src="https://ik.imagekit.io/sharewallet/Group%205.png?updatedAt=1749731462526" alt="Logo" className="w-auto h-12" />
    </div>

    {/* Header Text */}
    <div className="flex flex-col items-start gap-2">
      <h2 className="text-2xl font-bold text-gray-800">
        {state === 'Sign Up' ? 'Create account' : 'Login'}
      </h2>
      <p className="text-sm text-gray-500">
        {state === 'Sign Up' ? 'Create your account' : 'Login to your account!'}
      </p>
    </div>

    {/* Form */}
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
      {state === 'Sign Up' && (
        <>
          <input
            onChange={e => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Full Name"
            required
            className="input-style"
          />
          <input
            onChange={e => setmobileNumber(e.target.value)}
            value={mobileNumber}
            type="number"
            placeholder="Mobile Number"
            required
            className="input-style"
          />
          <input
            onChange={e => setUsername(e.target.value)}
            value={username}
            type="text"
            placeholder="Username"
            required
            className="input-style"
          />
          <input
            onChange={e => setdateofBirth(e.target.value)}
            value={dateofBirth}
            type="date"
            placeholder="Date of Birth"
            className="input-style"
          />
        </>
      )}

      <input
        onChange={e => setEmail(e.target.value)}
        value={email}
        type="email"
        placeholder="Email"
        required
        className="input-style"
      />
      <input
        onChange={e => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Password"
        required
        className="input-style"
      />

      <p
        onClick={() => navigate('/reset-passsword')}
        className="text-sm text-blue-600 cursor-pointer hover:underline"
      >
        Forgot Password?
      </p>

      <button
        type="submit"
        className="px-4 py-2 text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        {state}
      </button>
    </form>

    {/* Footer toggle */}
    {state === 'Sign Up' ? (
      <p className="text-sm text-gray-600">
        Already have an account?{' '}
        <span
          onClick={() => setState('Login')}
          className="text-blue-600 cursor-pointer hover:underline"
        >
          Login here
        </span>
      </p>
    ) : (
      <p className="text-sm text-gray-600">
        Don’t have an account?{' '}
        <span
          onClick={() => setState('Sign Up')}
          className="text-blue-600 cursor-pointer hover:underline"
        >
          Sign up
        </span>
      </p>
    )}
  </div>
</div>





  )
}

export default Login