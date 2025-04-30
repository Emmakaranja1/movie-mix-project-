import React, { useState } from "react";
import { useMovies } from "../context/MovieContext";
import "../style/AllMovies.css";


const AllMovies = () => {
  const {
    movies,
    loading,
    error,
    addMovie,
    deleteMovie,
    rateMovie,
    addToWatchlist,
  } = useMovies();

  const [newMovie, setNewMovie] = useState({
    title: "",
    genre: "",
    releaseYear: "",
    image: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({ ...newMovie, [name]: value });
  };

  const handleAddMovie = async () => {
    // Basic validation
    if (
      !newMovie.title ||
      !newMovie.genre ||
      !newMovie.releaseYear ||
      !newMovie.image
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const result = await addMovie(newMovie);
    if (result.success) {
      setNewMovie({
        title: "",
        genre: "",
        releaseYear: "",
        image: "",
        description: "",
      });
    } else {
      alert(`Error adding movie: ${result.message}`);
    }
  };

  const handleDeleteMovie = async (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      await deleteMovie(id);
    }
  };

  const handleRateMovie = async (id, rating) => {
    await rateMovie(id, rating);
  };

  const handleLikeMovie = async (movie) => {
    const result = await addToWatchlist(movie);
    if (result.success) {
      alert(`"${movie.title}" added to your watchlist!`);
    } else {
      alert(`Error: ${result.message}`);
    }
  };

  if (loading) return <div className="loading-container">Loading...</div>;
  if (error) return <div className="error-container">Error: {error}</div>;

  return (
    <div className="all-movies">
      <h1>All Movies</h1>

      <div className="add-movie-form">
        <h2>Add New Movie</h2>
        <input
          type="text"
          name="title"
          placeholder="Title *"
          value={newMovie.title}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre *"
          value={newMovie.genre}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="releaseYear"
          placeholder="Release Year *"
          value={newMovie.releaseYear}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL *"
          value={newMovie.image}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newMovie.description}
          onChange={handleInputChange}
          rows="4"
        />
        <button onClick={handleAddMovie}>Add Movie</button>
      </div>

      <h2 className="section-title">Browse Movies</h2>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <div className="movie-image">
              <img src={movie.image} alt={movie.title} />
            </div>
            <div className="movie-info">
              <h2>{movie.title}</h2>
              <p>
                {movie.genre} • {movie.releaseYear}
              </p>
              <div className="rating-buttons">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRateMovie(movie.id, star)}
                    className={`star-button ${
                      movie.rating >= star ? "selected" : ""
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div className="movie-controls">
              <button
                className="like-button"
                onClick={() => handleLikeMovie(movie)}
              >
                Watch Later
              </button>
              <button
                className="delete-button"
                onClick={() => handleDeleteMovie(movie.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMovies;
