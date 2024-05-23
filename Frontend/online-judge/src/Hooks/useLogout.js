import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from './AuthContext'

const useLogout = () => {
  const navigate = useNavigate()
  const { setIsLoggedIn } = useContext(AuthContext)
  const logout = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_END_URL}/logout`,
        {},
        {
          withCredentials: true,
        }
      )
      console.log(response.data)
      setIsLoggedIn(false)
      navigate('/')
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  return logout
}

export default useLogout
