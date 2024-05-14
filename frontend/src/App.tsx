import React from "react";
import "./App.css";
import LoginPage from "./pages/login";
import Dashboard from "./pages/dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminPage from "./pages/admin";
const router = createBrowserRouter([
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "admin",
    element: <AdminPage />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
