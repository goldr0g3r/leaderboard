import React from "react";
import "./App.css";
import LoginPage from "./pages/login";
import Dashboard from "./pages/dashboard";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import AdminPage from "./pages/admin";

function PrivateRoute({ children }: { children: any }) {
  const location = useLocation();
  const isLoggedIn = sessionStorage.getItem("token");

  if (isLoggedIn) return children;
  return (
    <Navigate
      to="/login"
      state={{
        from: location.pathname,
      }}
    />
  );
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute>
        <AdminPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
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
