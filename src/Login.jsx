import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Get the account from localStorage
    const savedAccount = localStorage.getItem("account");

    if (!savedAccount) {
      setError("No account found. Please sign up first.");
      return;
    }

    try {
      const accountData = JSON.parse(savedAccount);

      // Simple authentication check
      if (accountData.email === email) {
        // In a real app, you'd check the password hash here
        // For this demo, we'll assume the login is successful

        // Set a login status in localStorage
        localStorage.setItem("isLoggedIn", "true");

        // Navigate to homepage after successful login
        navigate("/Homepage");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>

        {error && <div className="error-message">{error}</div>}

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />

        <button type="submit">Login</button>

        <div className="signup-link">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")} className="link">
            Sign up
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
