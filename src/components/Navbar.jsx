import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/Navbar.css";
import Searchbar from "./Searchbar.jsx";
import { useAuth } from "../context/UserContext";

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Helper function to get user's initials
  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate("/homepage");
  };

  return (
    <nav>
      <div className="logo">
        <Link to="/homepage">MovieMix</Link>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/homepage">
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/all-movies">
            <span>All Movies</span>
          </Link>
        </li>
        {isAuthenticated && (
          <>
            <li>
              <Link to="/watchlist">
                <span>Watchlist</span>
              </Link>
            </li>
            <li>
              <Link to="/rated-5-stars">
                <span>Rated 5 Stars</span>
              </Link>
            </li>
          </>
        )}
      </ul>

      <div className="search-bar">
        <Searchbar />
      </div>

      <div className="auth-links">
        {isAuthenticated ? (
          <div className="user-profile">
            <div
              className="profile-button"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.name || "User"}
                  className="avatar"
                />
              ) : (
                <div className="avatar initials-avatar">
                  {getInitials(user.name)}
                </div>
              )}
              <span>{user.name || "User"}</span>
            </div>

            {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/profile" onClick={() => setShowDropdown(false)}>
                  My Profile
                </Link>
                <hr />
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="login-btn">
              Login
            </Link>
            <Link to="/signup" className="signup-btn">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
