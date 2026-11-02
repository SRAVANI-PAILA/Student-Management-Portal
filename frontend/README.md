# 🎓 Student Management System

A simple and responsive **Student Management System** built using **React JS, JSON Server, Axios, and React Router**.

This project allows users to manage student records easily with complete CRUD operations such as adding, viewing, updating, and deleting students.

---

## 🚀 Features

- 🏠 Home / Dashboard
- 👨‍🎓 View all students
- ➕ Add new student
- ✏️ Edit student details
- 👁️ View complete student details
- 🗑️ Delete student
- 🔢 Automatic numeric Student ID
- ✅ Form validation
- 🚫 Unique Roll Number validation
- 🚫 Unique Email validation
- 📱 Fully responsive design
- 🍔 Mobile hamburger navigation menu
- 🔗 React Router navigation
- ⚡ Axios API integration
- 💾 JSON Server as a local REST API

---

## 🛠️ Technologies Used

### Frontend
- React JS
- JavaScript
- HTML
- CSS

### Libraries
- React Router DOM
- Axios

### Backend / Database
- JSON Server
- JSON file (`db.json`)

### Development Tool
- Vite
- VS Code
- Git & GitHub

---

## 📂 Project Structure

```text
student-management/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Navbar.css
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── Students.jsx
│   │   ├── Students.css
│   │   ├── AddStudent.jsx
│   │   ├── AddStudent.css
│   │   ├── EditStudent.jsx
│   │   ├── EditStudent.css
│   │   ├── StudentDetails.jsx
│   │   ├── StudentDetails.css
│   │   ├── About.jsx
│   │   └── About.css
│   │
│   ├── services/
│   │   └── studentService.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── db.json
├── package.json
├── package-lock.json
├── vite.config.js
