import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Menu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/verify`
        )
        if (response.istrue === true) setIsLoggedIn(true)
      } catch (error) {
        setIsLoggedIn(false)
      }
    }
    checkLoginStatus()
  }, [])
  return (
    <div className="px-2 md:px-0 py-3 space-y-2 md:space-y-0 md:space-x-2 font-medium text-slate-700">
      <Link
        to="/"
        className="block md:inline-block px-3 py-2 rounded-md text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
      >
        Home
      </Link>
      <Link
        to="/Problems"
        className="block md:inline-block px-3 py-2 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
      >
        Problems
      </Link>
      <Link
        to="/Contests"
        className="block md:inline-block px-3 py-2 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
      >
        Contests
      </Link>
      {isLoggedIn && (
        <Link
          to="/Dashboard:id"
          className="block md:inline-block px-3 py-2 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
        >
          DashBoard
        </Link>
      )}
      {isLoggedIn && (
        <Link>
          to="/Signout" className="block md:inline-block px-3 py-2 rounded-md
          hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white
          focus:bg-gray-700"
        </Link>
      )}

      {!isLoggedIn && (
        <Link
          to="/signin"
          className="block md:inline-block px-3 py-2 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
        >
          Sign In
        </Link>
      )}

      {!isLoggedIn && (
        <Link
          to="/signup"
          className="block md:inline-block px-3 py-2 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
        >
          Register
        </Link>
      )}
    </div>
  )
}

export default Menu
