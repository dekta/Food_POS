import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuPage from './pages/MenuPage';
import OrderPage from './pages/OrderPage';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute"
import CheckoutPage from './pages/CheckoutPage';
import Navbar from './components/Navbar';
import { Box } from '@mui/material';
import { handleGetUser } from './utils/helper';

const App = () => {
    const user = handleGetUser();

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Navbar isLogout={user.isAdmin} />
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<ProtectedRoute><RegisterPage /></ProtectedRoute>} />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <MenuPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/checkout"
                    element={
                        <ProtectedRoute>
                            <CheckoutPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/orders"
                    element={
                        <ProtectedRoute>
                            <OrderPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Box>
    );
};

export default App;
