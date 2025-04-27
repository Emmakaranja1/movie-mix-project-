import React, { useState, useEffect } from "react";
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

  // Function to remove a movie from the watchlist
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
    <div className="watchlist">
      <h1>My Watchlist</h1>
      {watchlist.length === 0 ? (
        <p>Your watchlist is empty.</p>
      ) : (
        <div className="movie-list">
          {watchlist.map((movie) => (
            <div key={movie.id} className="movie-card">
              <div className="movie-image">
                <img src={movie.image} alt={movie.title} />
              </div>
              <div className="movie-info">
                <h2>{movie.title}</h2>
                <p>Genre: {movie.genre}</p>
                <p>Year: {movie.releaseYear}</p>
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
