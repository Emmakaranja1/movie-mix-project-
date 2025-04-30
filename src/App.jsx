import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MovieProvider } from "./context/MovieContext";
import { UserProvider } from "./context/UserContext";
import Navbar from "./components/Navbar.jsx";
import Homepage from "./pages/Homepage.jsx";
import AllMovies from "./pages/AllMovies.jsx";
import Watchlist from "./pages/Watchlist.jsx";
import RatedFiveStars from "./pages/RatedFiveStars.jsx";
import DisplaySearch from "./components/DisplaySearch.jsx";
import Moviedetails from "./components/Moviedetails.jsx";
import Profile from "./components/Profile.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <UserProvider>
      <MovieProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <Routes>
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/homepage" element={<Homepage />} />
              <Route path="/display-search" element={<DisplaySearch />} />
              <Route path="/all-movies" element={<AllMovies />} />
              <Route
                path="/watchlist"
                element={
                  <ProtectedRoute>
                    <Watchlist />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/rated-5-stars"
                element={
                  <ProtectedRoute>
                    <RatedFiveStars />
                  </ProtectedRoute>
                }
              />
              <Route path="/movie/:id" element={<Moviedetails />} />
              <Route path="/" element={<Homepage />} />
            </Routes>
          </div>
        </Router>
      </MovieProvider>
    </UserProvider>
  );
}

export default App;
