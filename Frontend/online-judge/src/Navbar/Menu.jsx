import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import AuthContext from '../Hooks/AuthContext'

const Menu = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)

  useEffect(() => {
    const checkLoginStatus = async () => {
      console.log('Checking login status')
      try {
        const response = await axios.get(`http://localhost:3000/verify`, {
          withCredentials: true,
        })
        console.log(response.data)
        if (response.data.is_true === true) {
          setIsLoggedIn(true)
          console.log('User is logged in')
        } else {
          setIsLoggedIn(false)
          console.log('User is not logged in')
        }
      } catch (error) {
        setIsLoggedIn(false)
        console.error('User is not logged in')
      }
    }
    checkLoginStatus()
  }, [setIsLoggedIn])
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
        <Link
          to="/Signout"
          className="block md:inline-block px-3 py-2 rounded-md
          hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white
          focus:bg-gray-700"
        ></Link>
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
