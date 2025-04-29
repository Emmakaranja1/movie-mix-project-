import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Searchbar({ setSelectedMovie }) {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

    // Replace axios with fetch
    fetch("http://localhost:3001/movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((movies) => {
        // More flexible search that includes partial matches
        const foundMovies = movies.filter(
          (movie) =>
            movie.title &&
            movie.title.toLowerCase().includes(query.toLowerCase().trim())
        );

        if (foundMovies.length > 0) {
          // If we found movies, use the first match
          setSelectedMovie(foundMovies[0]);
          navigate("/display-search");
        } else {
          setSelectedMovie(null);
          alert("No movies found matching your search.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        alert(`An error occurred: ${error.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
