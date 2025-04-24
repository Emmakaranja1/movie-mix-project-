import React from "react";
import { Link } from "react-router-dom";

const navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/Homepage">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </nav>
  );
};

export default navbar;
