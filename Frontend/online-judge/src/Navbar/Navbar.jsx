import React, { useState } from 'react'
// import Button from './Button'
import Menu from './Menu'
import Logo from '../assets/Logo.png'
const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  return (
    <nav className="bg-black">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20  border-b border-solid border-slate-600">
        <div className="flex-shrink-0 font-bold tracking-wider">
          <img className="h-40 w-auto" src={Logo} alt="CodeHub" />
        </div>
        <div className="hidden md:block">
          <Menu></Menu>
        </div>
        <button
          type="button"
          className="md:hidden bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <svg
            className="h-6 w-6"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <div className="md:hidden">{showMobileMenu && <Menu />}</div>
    </nav>
  )
}

export default Navbar
