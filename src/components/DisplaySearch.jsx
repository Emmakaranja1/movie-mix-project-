import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./DisplaySearch.css";

function DisplaySearch({ selectedMovie }) {
  const navigate = useNavigate();

  // Redirect if no movie is selected
  useEffect(() => {
    if (!selectedMovie) {
      navigate("/homepage");
    }
  }, [selectedMovie, navigate]);

  if (!selectedMovie) {
    return null; // This will prevent rendering while redirecting
  }

  return (
    <div className="display-search">
      <h2>Search Result</h2>
      <div className="movie-details">
        <img
          src={selectedMovie.image}
          alt={selectedMovie.title}
          className="movie-image"
        />
        <div className="movie-info">
          <h3>{selectedMovie.title}</h3>
          <p>Genre: {selectedMovie.genre}</p>
          <p>Release Year: {selectedMovie.releaseYear}</p>
          {selectedMovie.rating && <p>Rating: {selectedMovie.rating}/10</p>}
          {selectedMovie.description && (
            <p className="description">{selectedMovie.description}</p>
          )}
          <div className="actions">
            <Link to={`/movie/${selectedMovie.id}`} className="btn">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplaySearch;
