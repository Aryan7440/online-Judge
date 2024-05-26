import React, { useState } from 'react'
import AuthContext from './AuthContext'

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [role, setRole] = useState('')
  const [UserName, setUserName] = useState('')

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        role,
        setRole,
        UserName,
        setUserName,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
