import React, { useEffect, useState } from "react";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    title: "",
    genre: "",
    releaseYear: "",
    image: "",
  });


  useEffect(() => {
    // Fetch movies from db.json
    fetch("http://localhost:3001/movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        return response.json();
      })
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({ ...newMovie, [name]: value });
  };


  const handleAddMovie = () => {
    // Add new movie to the backend
    fetch("http://localhost:3001/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add movie");
        }
        return response.json();
      })
      .then((data) => {
        setMovies([...movies, data]); 
        setNewMovie({ title: "", genre: "", releaseYear: "", image: "" }); 
      })
      .catch((error) => console.error("Error adding movie:", error));
  };
    
  const handleDeleteMovie = (id) => {
    // Delete movie from the backend
    fetch(`http://localhost:3001/movies/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete movie");
        }
        // Update the frontend by removing the deleted movie
        setMovies(movies.filter((movie) => movie.id !== id));
      })
      .catch((error) => console.error("Error deleting movie:", error));
  };

  const handleLikeMovie = (movie) => {
    // Add liked movie to the watchlist in the backend
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
        return response.json();
      })
      .then(() => {
        alert(`${movie.title} has been added to your watchlist!`);
      })
      .catch((error) => console.error("Error adding movie to watchlist:", error));
  };

  const handleRateMovie = (id, rating) => {
    // Update the movie's rating in the backend
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
      .then((updatedMovie) => {
        // Update the frontend with the new rating
        setMovies(
          movies.map((movie) => (movie.id === updatedMovie.id ? updatedMovie : movie))
        );

        // Add the rated movie to the watchlist if rated 5 stars
        if (rating === 5) {
          fetch("http://localhost:3001/ratedFiveStars", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedMovie),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(" Failed to add movie to RatedFiveStars");
              }
              return response.json();
            })
            .then(() => {
              alert(`${updatedMovie.title}  has been added to RatedFiveStars!`);
            })
            .catch((error) =>
              console.error("Error adding movie to RatedFiveStars:", error)
            );
        }
      })
      .catch((error) => console.error("Error rating movie:", error));
  };
  return (


    <div>
      <h1>All Movies</h1>
      <div className="add-movie-form">
        <h2>Add New Movie</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newMovie.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={newMovie.genre}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="releaseYear"
          placeholder="Release Year"
          value={newMovie.releaseYear}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={newMovie.image}
          onChange={handleInputChange}
        />
        <button onClick={handleAddMovie}>Add Movie</button>
      </div>
      <ul className="movies-list">
        {movies.map((movie) => (
          <li key={movie.id}  >
            <img src={movie.image} alt={movie.title} className="movie-image" />
            <h2>{movie.title}</h2>
            <p>Genre: {movie.genre}</p>
            <p>Release Year: {movie.releaseYear}</p> 
            <button
              className="delete-button"
              onClick={() => handleDeleteMovie(movie.id)}
            >
              Delete
            </button>
            <button
              className="like-button"
              onClick={() => handleLikeMovie(movie)}
            >
              Like
            </button>  
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
        </li>
        ))}
      </ul>
    </div>
  );
};

export default AllMovies;