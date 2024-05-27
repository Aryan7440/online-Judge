// import { Link } from 'react-router-dom'
import HomePage from './HomePage/HomePage'
import Navbar from './Navbar/Navbar'
import Registration from './Registration/Registration'
import LogIn from './LogIn/LogIn'
import DashBoard from './DashBoard/DashBoard'
import PageNotFound from './PageNotFound/PageNotFound'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthProvider from './Hooks/AuthProvider'
import Addquestion from './AddQuestion/Addquestion'
import FetchQuestions from './FetchQuestions/FetchQuestions'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="signup" element={<Registration />} />
          <Route path="signin" element={<LogIn />} />
          <Route path="dashboard/:UserName" element={<DashBoard />} />
          <Route path="addquestion" element={<Addquestion />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="questions" element={<FetchQuestions />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
