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

const App = () => {
    return (
        <Box sx={{display:"flex",flexDirection:"column"}}>
            <Navbar />
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
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
