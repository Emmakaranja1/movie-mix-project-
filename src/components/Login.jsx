import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import "../style/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    // Simple validation
    if (!email || !password) {
      setFormError("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    const result = await login(email, password);
    setIsSubmitting(false);

    if (result.success) {
      navigate("/profile");
    } else {
      setFormError(result.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login to MovieMix</h1>

        {formError && <div className="error-message">{formError}</div>}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="register-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>

        {/* Demo credentials section for testing */}
        <div className="demo-credentials">
          <h4>Demo Credentials:</h4>
          <p>
            <strong>Email:</strong> john@example.com
          </p>
          <p>
            <strong>Password:</strong> password123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
