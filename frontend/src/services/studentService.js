
import axios from "axios";

const API_URL = "https://student-management-backend-a7p5.onrender.com/api/students";

// GET - All students
export const getStudents = () => {
  return axios.get(API_URL);
};

// GET - Single student
export const getStudentById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// POST - Add student
export const addStudent = (student) => {
  return axios.post(API_URL, student);
};

// PUT - Update student
export const updateStudent = (id, student) => {
  return axios.put(`${API_URL}/${id}`, student);
};

// DELETE - Delete student
export const deleteStudent = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
