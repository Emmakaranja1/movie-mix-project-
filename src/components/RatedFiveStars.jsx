import React, { useEffect, useState } from "react";

const RatedFiveStars = () => {
  const [ratedMovies, setRatedMovies] = useState([]);

  useEffect(() => {
    // Fetch movies with a rating of 5 stars from db.json
    fetch("http://localhost:3001/ratedFiveStars")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch rated movies");
        }
        return response.json();
      })
      .then((data) => {
        setRatedMovies(data);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);


  const handleDeleteRatedMovie = (id) => {
    // Delete movie from the RatedFiveStars list in the backend
    fetch(`http://localhost:3001/ratedFiveStars/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete rated movie");
        }
        // Update the frontend by removing the deleted movie
        setRatedMovies(ratedMovies.filter((movie) => movie.id !== id));
      })
      .catch((error) => console.error("Error deleting rated movie:", error));
  };

  return (
    <div>
      <h1>Rated 5 Stars</h1>
      <ul>
        {ratedMovies.length > 0 ? (
          ratedMovies.map((movie) => (
            <li key={movie.id}>
              <img src={movie.image} alt={movie.title} className="movie-image" />
              <h2>{movie.title}</h2>
              <p>Genre: {movie.genre}</p>
              <p>Release Year: {movie.releaseYear}</p>
              <p>Rating: {movie.rating}</p>
              <button
                className="delete-button"
                onClick={() => handleDeleteRatedMovie(movie.id)}
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No movies rated 5 stars found.</p>
        )}
      </ul>
    </div>
  );
};

export default RatedFiveStars;