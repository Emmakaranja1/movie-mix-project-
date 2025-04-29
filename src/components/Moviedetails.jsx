import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMovies } from "../context/MovieContext";
import "../style/Moviedetails.css";
import { API_BASE_URL } from "../services/api";

const Moviedetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { addToWatchlist } = useMovies();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/movies/${id}`);
        if (!response.ok) {
          throw new Error("Movie not found");
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleAddToWatchlist = async () => {
    if (!movie) return;

    const result = await addToWatchlist(movie);
    if (result.success) {
      alert("Added to watchlist!");
    } else {
      alert(`Error: ${result.message}`);
    }
  };

  if (loading) return <div className="loading-container">Loading...</div>;
  if (error) return <div className="error-container">Error: {error}</div>;

  return (
    <div className="movie-details-page">
      <div
        className="movie-backdrop"
        style={{ backgroundImage: `url(${movie.image})` }}
      ></div>
      <div className="movie-details-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="movie-details-content">
          <div className="movie-poster-container">
            <img src={movie.image} alt={movie.title} className="movie-poster" />
          </div>

          <div className="movie-info-container">
            <h1>{movie.title}</h1>
            <div className="movie-meta">
              <span>{movie.releaseYear}</span>
              <span className="separator">•</span>
              <span>{movie.genre}</span>
              {movie.rating && (
                <>
                  <span className="separator">•</span>
                  <span className="rating">{movie.rating}/10 ★</span>
                </>
              )}
            </div>

            <p className="movie-description">
              {movie.description || "No description available."}
            </p>

            <div className="action-buttons">
              <button className="play-button">▶ Watch Now</button>
              <button className="add-button" onClick={handleAddToWatchlist}>
                + Add to Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Moviedetails;
