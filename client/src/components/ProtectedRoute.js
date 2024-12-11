import React from 'react';
import { Navigate } from 'react-router-dom';

// Check if the user is authenticated
const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token; // Returns true if the token exists, otherwise false
};

const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
        // If not authenticated, redirect to the login page
        return <Navigate to="/login" />;
    }
    // Render the children if authenticated
    return children;
};

export default ProtectedRoute;
