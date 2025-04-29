import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMovies } from "../context/MovieContext";

function Searchbar() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { movies, setSelectedMovie } = useMovies();

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = () => {
    if (!query.trim()) {
      setSelectedMovie(null);
      alert("Please enter a movie title to search.");
      return;
    }

    setIsLoading(true);

    // Search directly from the movies in context instead of fetching again
    const foundMovies = movies.filter(
      (movie) =>
        movie.title &&
        movie.title.toLowerCase().includes(query.toLowerCase().trim())
    );

    if (foundMovies.length > 0) {
      setSelectedMovie(foundMovies[0]);
      navigate("/display-search");
    } else {
      setSelectedMovie(null);
      alert("No movies found matching your search.");
    }

    setIsLoading(false);
  };

  // Add Enter key support
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        aria-label="Search for movies"
      />
      <button onClick={handleSearchClick} disabled={isLoading}>
        {isLoading ? "Searching..." : "Search"}
      </button>
    </div>
  );
}

export default Searchbar;
