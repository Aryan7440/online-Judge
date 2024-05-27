import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import AuthContext from '../Hooks/AuthContext'
import useLogout from '../Hooks/useLogout'

const Menu = () => {
  const { isLoggedIn, setIsLoggedIn, role, setRole, UserName, setUserName } =
    useContext(AuthContext)
  const logout = useLogout()

  useEffect(() => {
    const checkLoginStatus = async () => {
      console.log('Checking login status')
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACK_END_URL}/verify`,
          {
            withCredentials: true,
          }
        )
        console.log(response.data)

        if (response.data.is_true === true) {
          setRole(response.data.role)
          setUserName(response.data.email)
          console.log(`User is logged in as ${response.data.role}`)
          console.log(`User name is ${response.data.email}`)
          setIsLoggedIn(true)
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
  }, [isLoggedIn, role, setIsLoggedIn, setRole, setUserName, UserName])
  return (
    <div className="px-2 md:px-0 py-3 space-y-2 md:space-y-0 md:space-x-2 font-medium text-white">
      <Link
        to="/"
        className="block md:inline-block px-3 py-2 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
      >
        Home
      </Link>
      <Link
        to="/questions"
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
          to={`/dashboard/${UserName}`}
          className="block md:inline-block px-3 py-2 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
        >
          DashBoard
        </Link>
      )}
      {isLoggedIn && role === 'Admin' && (
        <Link
          to="/addQuestion"
          className="block md:inline-block px-3 py-2 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
        >
          Add Question
        </Link>
      )}
      {isLoggedIn && (
        <Link
          onClick={logout}
          to="/"
          className="block md:inline-block px-3 py-2 rounded-md
          hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white
          focus:bg-gray-700"
        >
          Sign Out
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
