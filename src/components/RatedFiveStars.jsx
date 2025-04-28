import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/RatedFiveStars.css";

const RatedFiveStars = () => {
  const [ratedMovies, setRatedMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRatedMovies = async () => {
      try {
        const response = await fetch("http://localhost:3001/ratedFiveStars");
        if (!response.ok) {
          throw new Error("Failed to fetch rated movies");
        }
        const data = await response.json();
        // Remove duplicates by ID
        const uniqueMovies = [
          ...new Map(data.map((movie) => [movie.id, movie])).values(),
        ];
        setRatedMovies(uniqueMovies);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRatedMovies();
  }, []);

  const removeRatedMovie = async (id) => {
    try {
      // Find all instances of this movie in the ratedFiveStars endpoint
      const response = await fetch("http://localhost:3001/ratedFiveStars");
      const allRated = await response.json();

      const toRemove = allRated.filter((m) => m.id === id);

      // Delete each instance
      for (const movie of toRemove) {
        await fetch(`http://localhost:3001/ratedFiveStars/${movie.id}`, {
          method: "DELETE",
        });
      }

      setRatedMovies(ratedMovies.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error("Failed to remove movie from rated list:", error);
    }
  };

  if (loading) return <div className="loading-container">Loading...</div>;
  if (error) return <div className="error-container">Error: {error}</div>;

  return (
    <div className="rated-page">
      <h1>Five-Star Rated Movies</h1>
      {ratedMovies.length === 0 ? (
        <div className="empty-ratings">
          <p>You haven't rated any movies 5 stars yet.</p>
          <Link to="/all-movies" className="browse-button">
            Browse Movies
          </Link>
        </div>
      ) : (
        <div className="movie-list">
          {ratedMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <div className="movie-image">
                <img src={movie.image} alt={movie.title} />
                <div className="rating-badge">5★</div>
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
                  onClick={() => removeRatedMovie(movie.id)}
                >
                  Remove Rating
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RatedFiveStars;
