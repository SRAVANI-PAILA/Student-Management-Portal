import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="logo">
        🎓 StudentHub
      </div>

      {/* Mobile Menu Icon */}
      <button
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Navigation Links */}
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>

        <NavLink
          to="/"
          className={({ isActive }) => isActive ? "active-link" : ""}
          onClick={() => setMenuOpen(false)}
        >
          Home
        </NavLink>

        <NavLink
          to="/students"
          className={({ isActive }) => isActive ? "active-link" : ""}
          onClick={() => setMenuOpen(false)}
        >
          Students Details
        </NavLink>

        <NavLink
          to="/add-student"
          className={({ isActive }) => isActive ? "active-link" : ""}
          onClick={() => setMenuOpen(false)}
        >
          Add Student
        </NavLink>

      </div>

    </nav>
  );
}

export default Navbar;