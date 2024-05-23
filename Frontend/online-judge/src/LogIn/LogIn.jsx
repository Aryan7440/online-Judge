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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <p>{errors.username}</p>}
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p>{errors.password}</p>}
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default LogIn
