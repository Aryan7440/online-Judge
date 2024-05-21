import { Link } from 'react-router-dom'
import './App.css'
function App() {
  return (
    <div className="App">
      <h1>react app</h1>
      <Link to="/signup">Sign Up</Link>
      <Link to="/signin">Sign In</Link>
      {/* <Link to="/dashboard/">Dashboard</Link> */}
    </div>
  )
}

export default App
