import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MovieProvider } from "./context/MovieContext";
import Navbar from "./components/Navbar.jsx";
import Homepage from "./components/Homepage.jsx";
import AllMovies from "./components/AllMovies.jsx";
import Watchlist from "./components/Watchlist.jsx";
import RatedFiveStars from "./components/RatedFiveStars.jsx";
import DisplaySearch from "./components/DisplaySearch.jsx";
import Moviedetails from "./components/Moviedetails.jsx";
import Profile from "./Profile.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";

function App() {
  return (
    <MovieProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/display-search" element={<DisplaySearch />} />
            <Route path="/all-movies" element={<AllMovies />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/rated-5-stars" element={<RatedFiveStars />} />
            <Route path="/movie/:id" element={<Moviedetails />} />
            <Route path="/" element={<Homepage />} />
          </Routes>
        </div>
      </Router>
    </MovieProvider>
  );
}

export default App;
