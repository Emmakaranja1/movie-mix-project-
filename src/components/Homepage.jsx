import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/Homepage.css";


const Homepage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:3002/movies");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className="homepage">
      <h1>Movie Mix</h1>

      {/* Navigation links moved from navbar to homepage */}
      <div className="homepage-nav">
        <Link to="/watchlist" className="nav-link">
          Watchlist
        </Link>
        <Link to="/all-movies" className="nav-link">
          All Movies
        </Link>
        <Link to="/rated-5-stars" className="nav-link">
          Rated Five Star
        </Link>
      </div>

      {error && <p className="error">Error: {error.message}</p>}
      {movies.length === 0 && !error && <p>No movies available.</p>}
      <div className="movie-list">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
            <h2>{movie.title}</h2>
            <p>
              <span>Genre:</span> {movie.genre}
            </p>
            <p>
              <span>Rating:</span> {movie.rating}/10
            </p>
            <p>
              <span>Year:</span> {movie.releaseYear}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );

};

export default Homepage;
