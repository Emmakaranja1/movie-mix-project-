import React, { createContext, useState, useEffect, useContext } from "react";

// Create a context
const MovieContext = createContext();

// Custom hook to use the movie context
export const useMovies = () => useContext(MovieContext);

// Provider component
export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [ratedFiveStars, setRatedFiveStars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Fetch all movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:3001/movies");
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Fetch watchlist
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
        console.error("Error fetching watchlist:", error);
      }
    };

    fetchWatchlist();
  }, []);

  // Fetch rated five stars
  useEffect(() => {
    const fetchRatedFiveStars = async () => {
      try {
        const response = await fetch("http://localhost:3001/ratedFiveStars");
        if (!response.ok) {
          throw new Error("Failed to fetch rated movies");
        }
        const data = await response.json();
        setRatedFiveStars(data);
      } catch (error) {
        console.error("Error fetching rated movies:", error);
      }
    };

    fetchRatedFiveStars();
  }, []);

  // Add movie to watchlist
  const addToWatchlist = async (movie) => {
    try {
      const response = await fetch("http://localhost:3001/watchlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      });

      if (!response.ok) {
        throw new Error("Failed to add to watchlist");
      }

      const addedMovie = await response.json();
      setWatchlist([...watchlist, addedMovie]);
      return { success: true, message: "Added to watchlist!" };
    } catch (error) {
      console.error("Error adding to watchlist:", error);
      return { success: false, message: error.message };
    }
  };

  // Remove from watchlist
  const removeFromWatchlist = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/watchlist/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to remove from watchlist");
      }

      setWatchlist(watchlist.filter((movie) => movie.id !== id));
      return { success: true };
    } catch (error) {
      console.error("Error removing from watchlist:", error);
      return { success: false, message: error.message };
    }
  };

  // Rate a movie
  const rateMovie = async (id, rating) => {
    try {
      const response = await fetch(`http://localhost:3001/movies/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating }),
      });

      if (!response.ok) {
        throw new Error("Failed to rate movie");
      }

      // Update movies state
      setMovies(
        movies.map((movie) => (movie.id === id ? { ...movie, rating } : movie))
      );

      // If rated 5 stars, add to rated-five-stars list
      if (rating === 5) {
        const movieToAdd = movies.find((m) => m.id === id);
        if (movieToAdd) {
          const ratedResponse = await fetch(
            "http://localhost:3001/ratedFiveStars",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...movieToAdd,
                rating: 5,
              }),
            }
          );

          if (ratedResponse.ok) {
            const addedRatedMovie = await ratedResponse.json();
            setRatedFiveStars([...ratedFiveStars, addedRatedMovie]);
          }
        }
      }

      return { success: true };
    } catch (error) {
      console.error("Error rating movie:", error);
      return { success: false, message: error.message };
    }
  };

  // Add a new movie
  const addMovie = async (movie) => {
    try {
      const response = await fetch("http://localhost:3001/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...movie, rating: 0 }),
      });

      if (!response.ok) {
        throw new Error("Failed to add movie");
      }

      const addedMovie = await response.json();
      setMovies([...movies, addedMovie]);
      return { success: true, movie: addedMovie };
    } catch (error) {
      console.error("Error adding movie:", error);
      return { success: false, message: error.message };
    }
  };

  // Delete a movie
  const deleteMovie = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/movies/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete movie");
      }

      setMovies(movies.filter((movie) => movie.id !== id));
      return { success: true };
    } catch (error) {
      console.error("Error deleting movie:", error);
      return { success: false, message: error.message };
    }
  };

  // Value object that will be passed to provider
  const value = {
    movies,
    watchlist,
    ratedFiveStars,
    loading,
    error,
    selectedMovie,
    setSelectedMovie,
    addToWatchlist,
    removeFromWatchlist,
    rateMovie,
    addMovie,
    deleteMovie,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
