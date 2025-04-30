import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/Homepage.css";
import { useMovies } from "../context/MovieContext";

const Homepage = () => {
  const { movies, loading, error } = useMovies();
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [moviesByGenre, setMoviesByGenre] = useState({});

  useEffect(() => {
    if (movies.length > 0) {
      // Set the highest rated movie as featured
      const highestRated = [...movies].sort((a, b) => b.rating - a.rating)[0];
      if (highestRated) {
        setFeaturedMovie(highestRated);
      }

      // Organize movies by genre
      const byGenre = {};
      movies.forEach((movie) => {
        if (!movie.genre) return;

        if (!byGenre[movie.genre]) {
          byGenre[movie.genre] = [];
        }
        byGenre[movie.genre].push(movie);
      });

      setMoviesByGenre(byGenre);
    }
  }, [movies]);

  const renderMovieCard = (movie) => (
    <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
      <div className="movie-image">
        <img src={movie.image} alt={movie.title} />
      </div>
      <div className="movie-info">
        <h2>{movie.title}</h2>
        <p>
          {movie.genre} • {movie.releaseYear}
        </p>
        {movie.rating > 0 && <p className="rating">{movie.rating}/10 ★</p>}
      </div>
    </Link>
  );

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className="homepage">
      {featuredMovie && (
        <div
          className="featured-movie"
          style={{ backgroundImage: `url(${featuredMovie.image})` }}
        >
          <div className="featured-content">
            <h2>{featuredMovie.title}</h2>
            <p>
              {featuredMovie.description ||
                `A ${featuredMovie.genre} movie from ${featuredMovie.releaseYear}`}
            </p>
            <div className="featured-buttons">
              <Link to={`/movie/${featuredMovie.id}`}>
                <button className="play-button">▶ Watch Now</button>
              </Link>
              <button className="info-button">+ My List</button>
            </div>
          </div>
        </div>
      )}

      <h1>Movie Mix</h1>
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

      {error && <p className="error">Error: {error}</p>}

      {/* Display highest rated movies first */}
      <h2 className="section-title">Featured Movies</h2>
      <div className="movie-row">
        <div className="movie-row-inner">
          {movies
            .filter((movie) => movie.rating >= 4)
            .slice(0, 10)
            .map(renderMovieCard)}
        </div>
      </div>

      {/* Display recent releases */}
      <h2 className="section-title">Recent Releases</h2>
      <div className="movie-row">
        <div className="movie-row-inner">
          {[...movies]
            .sort((a, b) => b.releaseYear - a.releaseYear)
            .slice(0, 10)
            .map(renderMovieCard)}
        </div>
      </div>

      {/* Display movies by genre */}
      {Object.keys(moviesByGenre).map((genre) => (
        <div key={genre}>
          <h2 className="section-title">{genre} Movies</h2>
          <div className="movie-row">
            <div className="movie-row-inner">
              {moviesByGenre[genre].map(renderMovieCard)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Homepage;
