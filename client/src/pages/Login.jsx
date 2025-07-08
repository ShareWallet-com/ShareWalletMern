import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function Login() {
  const navigate = useNavigate()
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent)

  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mobileNumber, setmobileNumber] = useState('')
  const [dateofBirth, setdateofBirth] = useState('')
  const [username, setUsername] = useState('')

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()
      axios.defaults.withCredentials = true

      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/auth/register', {
          name, email, password, mobileNumber, dateofBirth, username
        }, { withCredentials: true })

        if (data.success) {
          setIsLoggedin(true)
          await getUserData()
          navigate('/dashboard')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/auth/login', {
          email, password
        }, { withCredentials: true })

        if (data.success) {
          setIsLoggedin(true)
          await getUserData()
          navigate('/dashboard')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="flex items-center justify-center px-4 py-10 h-[100vh] bg-gradient-to-tr from-indigo-50 to-indigo-100">
      <div className="w-full max-w-md px-8 py-10 bg-white border border-indigo-200 shadow-xl rounded-3xl">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="https://ik.imagekit.io/sharewallet/Group%2068.png?updatedAt=1749847778836" alt="Logo" className="h-12" />
        </div>

        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            {state === 'Sign Up' ? 'Create account' : 'Welcome back'}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {state === 'Sign Up' ? 'Let’s get started' : 'Please login to your account'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-2">
          {state === 'Sign Up' && (
            <>
              <input type="text" required placeholder="Full Name" value={name}
                onChange={e => setName(e.target.value)}
                className="input-style-adv" />

              <input type="number" required placeholder="Mobile Number" value={mobileNumber}
                onChange={e => setmobileNumber(e.target.value)}
                className="input-style-adv" />

              <input type="text" required placeholder="Username" value={username}
                onChange={e => setUsername(e.target.value)}
                className="input-style-adv" />

              <input type="date" value={dateofBirth}
                onChange={e => setdateofBirth(e.target.value)}
                className="input-style-adv" />
            </>
          )}

          <input type="email" required placeholder="Email" value={email}
            onChange={e => setEmail(e.target.value)}
            className="input-style-adv" />

          <input type="password" required placeholder="Password" value={password}
            onChange={e => setPassword(e.target.value)}
            className="input-style-adv" />

          <p
            onClick={() => navigate('/reset-passsword')}
            className="text-sm text-right text-indigo-600 cursor-pointer hover:underline"
          >
            Forgot Password?
          </p>

          <button
            type="submit"
            className="w-full py-2 text-lg font-medium text-white transition duration-300 bg-indigo-600 shadow-md rounded-xl hover:bg-indigo-700"
          >
            {state}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-sm text-center text-gray-600">
          {state === 'Sign Up' ? (
            <>
              Already have an account?{' '}
              <span onClick={() => setState('Login')} className="text-indigo-600 cursor-pointer hover:underline">
                Login here
              </span>
            </>
          ) : (
            <>
              Don’t have an account?{' '}
              <span onClick={() => setState('Sign Up')} className="text-indigo-600 cursor-pointer hover:underline">
                Sign up
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
