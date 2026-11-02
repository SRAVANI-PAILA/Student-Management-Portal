
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { getStudentById } from "../services/studentService";

import "./StudentDetails.css";

function StudentDetails() {
  const { id } = useParams();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch student details using MongoDB ID
  useEffect(() => {
    setLoading(true);
    setError("");

    getStudentById(id)
      .then((response) => {
        setStudent(response.data);
      })
      .catch((error) => {
        console.error("Error fetching student:", error);
        setStudent(null);

        setError(
          error.response?.status === 404
            ? "Student not found."
            : "Failed to load student details."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="details-loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  // Error or missing student
  if (error || !student) {
    return (
      <div className="details-loading">
        <h2>{error || "Student not found."}</h2>

        <Link to="/students">
          <button className="back-btn">
            ← Back to Students
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="details-page">
      <div className="details-container">
        {/* Heading */}
        <div className="details-heading">
          <div className="details-icon">👨‍🎓</div>
          <h1>Student Details</h1>
          <p>View complete student information</p>
        </div>

        {/* Student Card */}
        <div className="details-card">
          <div className="detail-item">
            <span className="detail-label">Name</span>
            <span className="detail-value">
              {student.name}
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Roll Number</span>
            <span className="detail-value">
              {student.rollNo}
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Email</span>
            <span className="detail-value">
              {student.email}
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Phone</span>
            <span className="detail-value">
              {student.phone}
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Gender</span>
            <span className="detail-value">
              {student.gender}
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Course</span>
            <span className="detail-value course-value">
              {student.course}
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Year</span>
            <span className="detail-value">
              {student.year}
            </span>
          </div>

          <div className="detail-item address-item">
            <span className="detail-label">Address</span>
            <span className="detail-value">
              {student.address}
            </span>
          </div>

          {/* Back Button */}
          <div className="details-actions">
            <Link to="/students">
              <button className="back-btn">
                ← Back to Students
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;

