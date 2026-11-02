import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import StudentDetails from "./pages/StudentDetails";


// Layout Component
function Layout() {
  return (
    <>
      <Navbar />

      <Outlet />
    </>
  );
}


// Router Configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      {
        index: true,
        element: <Home />
      },

      {
        path: "students",
        element: <Students />
      },

      {
        path: "add-student",
        element: <AddStudent />
      },

      {
        path: "edit-student/:id",
        element: <EditStudent />
      },

      {
        path: "student/:id",
        element: <StudentDetails />
      }
    ]
  }
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;