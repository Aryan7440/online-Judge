import React from 'react'

const AuthContext = React.createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  role: '',
  setRole: () => {},
  UserName: '',
  setUserName: () => {},
})

export default AuthContext
