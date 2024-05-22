import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const useLogout = () => {
  const navigate = useNavigate()

  const logout = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACK_END_URL}/logout`,
        {},
        { withCredentials: true }
      )
      navigate('/')
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  return logout
}

export default useLogout
