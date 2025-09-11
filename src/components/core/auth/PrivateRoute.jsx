import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/**
 * Protects routes that require authentication.
 * Redirects to /login if user is not authenticated.
 */
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  // Optional: Add a loading spinner or splash screen
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-white text-lg">
        Loading...
      </div>
    );
  }

  // If authenticated, render the protected children
  if (isAuthenticated) {
    return children;
  }

  // Otherwise, redirect to login
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
