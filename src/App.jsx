import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/index.css";
import Profile from "./Profile.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Homepage from "./components/Homepage.jsx";
import Navbar from "./components/Navbar.jsx";
function App() {
  const appStyle = {
    position: "relative",
    minHeight: "100vh",
    padding: "2rem",
  };

  return (
    <Router>
      <div style={appStyle}>
        <Navbar />
        <h1>Welcome to Movie Mix</h1>
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Homepage" element={<Homepage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
