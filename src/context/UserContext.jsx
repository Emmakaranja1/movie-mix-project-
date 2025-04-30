import React, { createContext, useState, useEffect, useContext } from "react";
import { API_BASE_URL } from "../services/api";

// Create context
const UserContext = createContext();

// Custom hook to use the user context
export const useAuth = () => useContext(UserContext);

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in (on component mount)
  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        // Check local storage for user data
        const storedUser = localStorage.getItem("moviemix_user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoggedInUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      // Use the hosted API to check user credentials
      const response = await fetch(`${API_BASE_URL}/users?email=${email}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const users = await response.json();

      // Find user with matching email and password
      const matchedUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!matchedUser) {
        throw new Error("Invalid email or password");
      }

      // Remove sensitive data before storing
      const { password: _, ...userWithoutPassword } = matchedUser;

      // Save user to state and local storage
      setUser(userWithoutPassword);
      localStorage.setItem(
        "moviemix_user",
        JSON.stringify(userWithoutPassword)
      );

      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, message: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Check if user already exists
      const checkResponse = await fetch(
        `${API_BASE_URL}/users?email=${userData.email}`
      );

      if (!checkResponse.ok) {
        throw new Error("Network response was not ok");
      }

      const existingUsers = await checkResponse.json();

      if (existingUsers.length > 0) {
        throw new Error("User with this email already exists");
      }

      // Create new user on the hosted API
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...userData,
          watchlist: [],
          favorites: [],
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      const newUser = await response.json();

      // Remove sensitive data before storing
      const { password: _, ...userWithoutPassword } = newUser;

      // Save user to state and local storage
      setUser(userWithoutPassword);
      localStorage.setItem(
        "moviemix_user",
        JSON.stringify(userWithoutPassword)
      );

      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, message: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("moviemix_user");
  };

  // Update user profile
  const updateProfile = async (updates) => {
    try {
      if (!user || !user.id) {
        throw new Error("Must be logged in to update profile");
      }

      const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedUser = await response.json();

      // Remove sensitive data before storing
      const { password: _, ...userWithoutPassword } = updatedUser;

      // Update state and local storage
      setUser(userWithoutPassword);
      localStorage.setItem(
        "moviemix_user",
        JSON.stringify(userWithoutPassword)
      );

      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, message: error.message };
    }
  };

  const value = {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
