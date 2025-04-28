import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Profile from "./Profile.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Navbar from "./components/Navbar.jsx";
import Homepage from "./components/Homepage.jsx";
import AllMovies from "./components/AllMovies";
import Watchlist from "./components/Watchlist";
import RatedFiveStars from "./components/RatedFiveStars";
import Moviedetails from "./components/Moviedetails";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Homepage" element={<Homepage />} />
          <Route path="/all-movies" element={<AllMovies />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/rated-5-stars" element={<RatedFiveStars />} />
          <Route path="/movie/:id" element={<Moviedetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
