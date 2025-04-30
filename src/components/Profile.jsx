import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import { useMovies } from "../context/MovieContext";
import "../style/Profile.css";

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const { watchlist, ratedFiveStars } = useMovies();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    profilePicture: user?.profilePicture || "",
    bio: user?.bio || "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  // Helper function to get user's initials
  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Update form data when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        profilePicture: user.profilePicture || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/homepage");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim()) {
      setMessage({ text: "Name cannot be empty", type: "error" });
      return;
    }

    const result = await updateProfile(formData);

    if (result.success) {
      setMessage({ text: "Profile updated successfully!", type: "success" });
      setIsEditing(false);
    } else {
      setMessage({
        text: result.message || "Failed to update profile",
        type: "error",
      });
    }

    // Clear message after 3 seconds
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 3000);
  };

  if (!user) {
    return <div className="loading-container">Loading profile...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>My Profile</h1>

        {message.text && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}

        {isEditing ? (
          <form onSubmit={handleSubmit} className="edit-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled
              />
              <small>Email cannot be changed</small>
            </div>

            <div className="form-group">
              <label htmlFor="profilePicture">Profile Picture URL</label>
              <input
                type="url"
                id="profilePicture"
                name="profilePicture"
                value={formData.profilePicture}
                onChange={handleInputChange}
                placeholder="https://example.com/profile.jpg"
              />
              <small>Leave blank to use initials as avatar</small>
            </div>

            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows="4"
                placeholder="Tell us about yourself and your movie preferences..."
              ></textarea>
            </div>

            <div className="form-buttons">
              <button type="submit" className="save-button">
                Save Changes
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    name: user.name || "",
                    email: user.email || "",
                    profilePicture: user.profilePicture || "",
                    bio: user.bio || "",
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-details">
            <div className="profile-header">
              <div className="profile-picture">
                {user.profilePicture ? (
                  <img src={user.profilePicture} alt={user.name} />
                ) : (
                  <div className="initials-avatar">
                    {getInitials(user.name)}
                  </div>
                )}
              </div>
              <div className="profile-info">
                <h2>{user.name}</h2>
                <p className="email">{user.email}</p>
                {user.bio && <p className="bio">{user.bio}</p>}
              </div>
            </div>

            <div className="profile-stats">
              <div className="stat">
                <span className="stat-value">{watchlist.length}</span>
                <span className="stat-label">Watchlist</span>
              </div>
              <div className="stat">
                <span className="stat-value">{ratedFiveStars.length}</span>
                <span className="stat-label">Rated 5 Stars</span>
              </div>
            </div>

            <div className="profile-actions">
              <button
                className="edit-button"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
