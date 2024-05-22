import React from 'react'
import useLogout from '../Hooks/useLogout'

const DashBoard = () => {
  const logout = useLogout()
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default DashBoard
