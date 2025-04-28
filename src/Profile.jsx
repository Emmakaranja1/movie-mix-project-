import { Link } from 'react-router-dom'
import './App.css'

function Profile() {
  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <p>Please login or sign up to continue.</p>
      <div className="profile-buttons">
        <Link to="/login" className="btn">
          Login
        </Link>
        <Link to="/signup" className="btn">
          Sign Up
        </Link>
      </div>
    </div>
  )
}

export default Profile
