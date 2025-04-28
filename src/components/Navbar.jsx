
import { Link } from 'react-router-dom';
//import Home_icon from '../../assets/Home-icon.png';
//import Logo_icon from '../../assets/Logo-icon.png';
//import all_movies_icon from '../../assets/All-movies-icon.png'; 
//import rated_5_stars from '../../assets/Rating-icon.png';
//import watchlist_icon from '../../assets/Watchlist-icon.png'; 
//import profile_icon from '../../assets/Profile-icon.png';

import './Navbar.css';
import Searchbar from './Searchbar.jsx';

function Navbar() {
  return (
    <nav>
      <div className="logo">
       
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
      </ul>

      <div className="search-bar">
        <Searchbar />
      </div>

      <div className="auth-links">
        <Link to="/login" className="btn">Login</Link>
        <hr />
        <Link to="/signup" className="btn">Sign Up</Link>
      </div>
    </nav>
  );
}


export default Navbar;
