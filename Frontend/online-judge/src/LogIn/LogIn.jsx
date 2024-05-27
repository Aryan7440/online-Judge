import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../Hooks/AuthContext'

const LogIn = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const { setIsLoggedIn } = useContext(AuthContext)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newErrors = {}
    if (!username) newErrors.username = 'Username is required.'
    if (!password) newErrors.password = 'Password is required.'
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      try {
        console.log('Login page entered')
        const response = await axios.post(
          `${process.env.REACT_APP_BACK_END_URL}/login`,
          {
            username,
            password,
          },
          { withCredentials: true }
        )
        console.log(response.data)
        const UserName = response.data.UserName
        console.log(`Username: ${username}, Password: ${password}`)
        setIsLoggedIn(true)
        navigate(`/dashboard/${UserName}`)
      } catch (error) {
        console.error('Error:', error)
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.username && (
              <p className="text-red-500 text-xs italic">{errors.username}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">{errors.password}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <input
              type="submit"
              value="Submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            />
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">or</p>
          <a
            href="/auth/google"
            className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Sign in with Google
          </a>
        </div>
      </div>
    </div>
  )
}

export default LogIn
