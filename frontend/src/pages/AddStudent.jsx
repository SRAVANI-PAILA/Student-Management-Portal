
import React, { useState } from "react";
import {
  addStudent,
  getStudents
} from "../services/studentService";

import { useNavigate } from "react-router-dom";
import "./AddStudent.css";

function AddStudent() {
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

  // Handle input changes
  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  // Add student
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
    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email.trim())
    ) {
      alert("Please enter a valid email!");
      return;
    }

    // Phone validation
    if (!/^[0-9]{10}$/.test(student.phone)) {
      alert("Phone number must contain exactly 10 digits!");
      return;
    }

    try {
      // Get existing students
      const response = await getStudents();
      const students = response.data;

      // Check duplicate roll number
      const rollExists = students.some(
        (item) =>
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
          String(item.email).trim().toLowerCase() ===
          student.email.trim().toLowerCase()
      );

      if (emailExists) {
        alert("Email already exists!");
        return;
      }

      // Prepare student data
      // MongoDB automatically generates _id
      const newStudent = {
        name: student.name.trim(),
        rollNo: student.rollNo.trim(),
        email: student.email.trim().toLowerCase(),
        phone: student.phone.trim(),
        gender: student.gender,
        course: student.course,
        year: student.year,
        address: student.address.trim()
      };

      // Save student to MongoDB through Express API
      await addStudent(newStudent);

      alert("Student added successfully!");

      navigate("/students");
    } catch (error) {
      console.error("Error adding student:", error);

      if (error.response?.status === 409) {
        alert("Roll number or email already exists!");
      } else if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Failed to add student! Please check your backend connection.");
      }
    }
  };

  return (
    <div className="add-page">
      <div className="add-container">

        <div className="form-heading">
          <div className="form-icon">🎓</div>
          <h1>Add Student</h1>
          <p>Enter student details to add a new student</p>
        </div>

        <form className="student-form" onSubmit={handleSubmit}>

          <div className="form-group">
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

          <div className="form-group">
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

          <div className="form-group">
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

          <div className="form-group">
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

          <div className="form-group">
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

          <div className="form-group">
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

          <div className="form-group">
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

          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              placeholder="Enter student address"
              value={student.address}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Add Student
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddStudent;