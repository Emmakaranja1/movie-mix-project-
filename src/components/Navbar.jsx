import { Link } from "react-router-dom";
import "./Navbar.css";
import Searchbar from "./Searchbar.jsx";

// Accept setSelectedMovie as prop
function Navbar({ setSelectedMovie }) {
  return (
    <nav>
      <div className="logo"></div>

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
        <li>
          <Link to="/profile">
            <span>Profile</span>
          </Link>
        </li>
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
        {/* Fix the route path to match App.jsx */}
        <li>
          <Link to="/display-search">
            <span>Display Search</span>
          </Link>
        </li>
      </ul>

      <div className="search-bar">
        {/* Pass setSelectedMovie to Searchbar */}
        <Searchbar setSelectedMovie={setSelectedMovie} />
      </div>

      <div className="auth-links">
        <Link to="/login" className="btn">
          Login
        </Link>
        <hr />
        <Link to="/signup" className="btn">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
