import React, { useEffect, useState } from "react";
import "../style/AllMovies.css";


const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    title: "",
    genre: "",
    releaseYear: "",
    image: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        return response.json();
      })
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({ ...newMovie, [name]: value });
  };

  const handleAddMovie = () => {
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

    fetch("http://localhost:3001/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newMovie, rating: 0 }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add movie");
        }
        return response.json();
      })
      .then((data) => {
        setMovies([...movies, data]);
        setNewMovie({
          title: "",
          genre: "",
          releaseYear: "",
          image: "",
          description: "",
        });
      })
      .catch((error) => console.error("Error adding movie:", error));
  };

  const handleDeleteMovie = (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      fetch(`http://localhost:3001/movies/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete movie");
          }
          setMovies(movies.filter((movie) => movie.id !== id));
        })
        .catch((error) => console.error("Error deleting movie:", error));
    }
  };

  const handleRateMovie = (id, rating) => {
    fetch(`http://localhost:3001/movies/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to rate movie");
        }
        return response.json();
      })
      .then(() => {
        setMovies(
          movies.map((movie) =>
            movie.id === id ? { ...movie, rating } : movie
          )
        );

        // If rated 5 stars, add to rated-five-stars list
        if (rating === 5) {
          const movieToAdd = movies.find((m) => m.id === id);
          if (movieToAdd) {
            fetch("http://localhost:3001/ratedFiveStars", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...movieToAdd,
                rating: 5,
                userRating: 5,
              }),
            })
              .then((response) => {
                if (response.ok) {
                  console.log("Added to 5-star rated list");
                }
              })
              .catch((error) =>
                console.error("Error adding to 5-star list:", error)
              );
          }
        }
      })
      .catch((error) => console.error("Error rating movie:", error));
  };

  const handleLikeMovie = (movie) => {
    fetch("http://localhost:3001/watchlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add movie to watchlist");
        }
        alert(`"${movie.title}" added to your watchlist!`);
      })
      .catch((error) => console.error("Error adding to watchlist:", error));
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
