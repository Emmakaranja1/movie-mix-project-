import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/Watchlist.css";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await fetch("http://localhost:3001/watchlist");
        if (!response.ok) {
          throw new Error("Failed to fetch watchlist");
        }
        const data = await response.json();
        setWatchlist(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  const removeFromWatchlist = async (movieId) => {
    try {
      await fetch(`http://localhost:3001/watchlist/${movieId}`, {
        method: "DELETE",
      });
      setWatchlist(watchlist.filter((movie) => movie.id !== movieId));
    } catch (error) {
      console.error("Failed to remove movie from watchlist:", error);
    }
  };

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (error) {
    return <div className="error-container">Error: {error}</div>;
  }

  return (
    <div className="watchlist-page">
      <h1>My Watchlist</h1>
      {watchlist.length === 0 ? (
        <div className="empty-watchlist">
          <p>Your watchlist is empty.</p>
          <p>Add movies to your watchlist to watch later!</p>
          <Link to="/all-movies" className="browse-button">
            Browse Movies
          </Link>
        </div>
      ) : (
        <div className="movie-list">
          {watchlist.map((movie) => (
            <div key={movie.id} className="movie-card">
              <div className="movie-image">
                <img src={movie.image} alt={movie.title} />
                <div className="overlay">
                  <Link to={`/movie/${movie.id}`} className="view-button">
                    View Details
                  </Link>
                </div>
              </div>
              <div className="movie-info">
                <h2>{movie.title}</h2>
                <p>
                  {movie.genre} • {movie.releaseYear}
                </p>
                <button
                  className="remove-button"
                  onClick={() => removeFromWatchlist(movie.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
