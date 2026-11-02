
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getStudentById,
  getStudents,
  updateStudent
} from "../services/studentService";

import "./EditStudent.css";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    rollNo: "",
    email: "",
    phone: "",
    gender: "",
    course: "",
    year: "",
    address: ""
  });

  // Get existing student details
  useEffect(() => {
    getStudentById(id)
      .then((response) => {
        setStudent(response.data);
      })
      .catch((error) => {
        console.error("Error fetching student:", error);
        alert(
          error.response?.data?.message ||
          "Failed to load student details!"
        );
      });
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  // Update student
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !student.name.trim() ||
      !student.rollNo.trim() ||
      !student.email.trim() ||
      !student.phone.trim() ||
      !student.gender ||
      !student.course ||
      !student.year ||
      !student.address.trim()
    ) {
      alert("Please fill all fields!");
      return;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email.trim())) {
      alert("Please enter a valid email!");
      return;
    }

    // Phone validation
    if (!/^[0-9]{10}$/.test(student.phone)) {
      alert("Phone number must contain exactly 10 digits!");
      return;
    }

    try {
      // Get all students
      const response = await getStudents();
      const students = response.data;

      // Check duplicate roll number
      const rollExists = students.some(
        (item) =>
          String(item._id) !== String(id) &&
          String(item.rollNo).trim().toLowerCase() ===
            student.rollNo.trim().toLowerCase()
      );

      if (rollExists) {
        alert("Roll number already exists!");
        return;
      }

      // Check duplicate email
      const emailExists = students.some(
        (item) =>
          String(item._id) !== String(id) &&
          String(item.email).trim().toLowerCase() ===
            student.email.trim().toLowerCase()
      );

      if (emailExists) {
        alert("Email already exists!");
        return;
      }

      // Update student in MongoDB
      const updatedStudent = {
        name: student.name.trim(),
        rollNo: student.rollNo.trim(),
        email: student.email.trim().toLowerCase(),
        phone: student.phone.trim(),
        gender: student.gender,
        course: student.course,
        year: student.year,
        address: student.address.trim()
      };

      await updateStudent(id, updatedStudent);

      alert("Student updated successfully!");
      navigate("/students");
    } catch (error) {
      console.error("Error updating student:", error);

      alert(
        error.response?.data?.message ||
        "Failed to update student!"
      );
    }
  };

  return (
    <div className="edit-page">
      <div className="edit-container">
        {/* Heading */}
        <div className="edit-heading">
          <div className="edit-icon">✏️</div>
          <h1>Edit Student</h1>
          <p>Update student details</p>
        </div>

        {/* Form */}
        <form className="edit-form" onSubmit={handleSubmit}>
          <div className="edit-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter student name"
              value={student.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-group">
            <label>Roll Number</label>
            <input
              type="text"
              name="rollNo"
              placeholder="Enter roll number"
              value={student.rollNo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={student.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter 10 digit phone number"
              value={student.phone}
              onChange={handleChange}
              maxLength={10}
              required
            />
          </div>

          <div className="edit-group">
            <label>Gender</label>
            <select
              name="gender"
              value={student.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="edit-group">
            <label>Course</label>
            <select
              name="course"
              value={student.course}
              onChange={handleChange}
              required
            >
              <option value="">Select Course</option>
              <option value="MCA">MCA</option>
              <option value="MBA">MBA</option>
              <option value="BCA">BCA</option>
              <option value="B.Sc">B.Sc</option>
            </select>
          </div>

          <div className="edit-group">
            <label>Year</label>
            <select
              name="year"
              value={student.year}
              onChange={handleChange}
              required
            >
              <option value="">Select Year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
            </select>
          </div>

          <div className="edit-group">
            <label>Address</label>
            <textarea
              name="address"
              placeholder="Enter student address"
              value={student.address}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="update-btn">
            Update Student
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditStudent;
