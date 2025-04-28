import React, { useEffect, useState } from "react";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    // Fetch movies from db.json
    fetch("http://localhost:3001/watchlist")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch watchlist movies");
        }
        return response.json();
    })
    .then((data) => {
      setWatchlist(data);
    })
    .catch((error) => console.error("Error fetching movies:", error));
}, []);

  const handleDeleteFromWatchlist = (id) => {
    // Delete movie from the watchlist in the backend
    fetch(`http://localhost:3001/watchlist/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete movie from watchlist");
        }
      // Update the frontend by removing the deleted movie
      setWatchlist((prevWatchlist) =>
        prevWatchlist.filter((movie) => movie.id !== id)
      );
    })
    .catch((error) => console.error("Error deleting movie from watchlist:", error));
};
  
  return (
    <div>
      <h1>Watchlist</h1>
      <ul>
        {watchlist.length > 0 ? (
          watchlist.map((movie, index) => (
            <li key={`${movie.id}-${index}`} >
               <img src={movie.image} alt={movie.title} className="movie-image" />
               <h2>{movie.title}</h2>
               <p>Genre: {movie.genre}</p>
              <p>Release Year: {movie.releaseYear}</p>
              <p>Rating: {movie.rating}</p>
               <button
                className="delete-button"
                onClick={() => handleDeleteFromWatchlist(movie.id)}
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No movies in your watchlist.</p>
        )}
      </ul>
    </div>
  );
};

export default Watchlist;