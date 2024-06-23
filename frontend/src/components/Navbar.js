// src/components/Navbar.js

import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div
        className="navbar-left"
        style={{
          fontFamily: "Brush Script MT, Brush Script Std, cursive",
          fontSize: "2rem",
        }}
      >
        <Link to="/" className="navbar-brand">
          Daily Planner
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
