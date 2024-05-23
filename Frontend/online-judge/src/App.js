// import { Link } from 'react-router-dom'
import HomePage from './HomePage/HomePage'
import Navbar from './Navbar/Navbar'
import Registration from './Registration/Registration'
import LogIn from './LogIn/LogIn'
import DashBoard from './DashBoard/DashBoard'
import PageNotFound from './PageNotFound/PageNotFound'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthProvider from './Hooks/AuthProvider'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="signup" element={<Registration />} />
          <Route path="signin" element={<LogIn />} />
          <Route path="dashboard/:UserId" element={<DashBoard />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
