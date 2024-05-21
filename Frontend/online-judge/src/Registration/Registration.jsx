import axios from 'axios'
import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

const Registration = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [fullName, setFullName] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const serverResponse = await axios.post(`http://localhost:3000/signup`, {
        username,
        email,
        password,
        DateOfBirth: dateOfBirth,
        FullName: fullName,
      })
      console.log(serverResponse)
      navigate('/signin')
      // Redirect the user to the login page
      // This will depend on your routing setup
    } catch (error) {
      console.error('Failed to register', error)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Date of Birth:
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          required
        />
      </label>
      <label>
        Full Name:
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </label>
      <button type="submit">Register</button>
    </form>
  )
}

export default Registration
