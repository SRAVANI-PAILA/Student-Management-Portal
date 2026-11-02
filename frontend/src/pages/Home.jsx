import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">

      <div className="hero">

        <div className="hero-content">

          <span className="welcome">
            Welcome to StudentHub 🎓
          </span>

          <h1>
            Student Management
            <span> System</span>
          </h1>

          <p>
            Manage student information easily, quickly and efficiently
            using our simple student management system.
          </p>

          <div className="hero-buttons">

            <Link to="/students">
              <button className="primary-btn">
                View Students →
              </button>
            </Link>

            <Link to="/add-student">
              <button className="secondary-btn">
                + Add Student
              </button>
            </Link>

          </div>

        </div>

        <div className="hero-icon">
          🎓
        </div>

      </div>

      <div className="features">

        <div className="feature-card">
          <div>👨‍🎓</div>
          <h3>Student Management</h3>
          <p>Store and manage student information.</p>
        </div>

        <div className="feature-card">
          <div>✏️</div>
          <h3>Easy Update</h3>
          <p>Edit student information whenever required.</p>
        </div>

        <div className="feature-card">
          <div>📊</div>
          <h3>Organized Data</h3>
          <p>View all student records in one place.</p>
        </div>

      </div>

    </div>
  );
}

export default Home;