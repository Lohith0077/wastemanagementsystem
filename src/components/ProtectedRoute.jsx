import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // If the user is not logged in, redirect them to the login page
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
