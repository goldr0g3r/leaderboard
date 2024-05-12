import React from "react";
import "./App.css";
import LoginPage from "./pages/login";
import Dashboard from "./pages/dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Card from "./components/Card";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "card",
    element: <Card description="game1" title="main game" rankings={[]} />,
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
