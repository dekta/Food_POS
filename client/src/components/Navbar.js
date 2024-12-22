import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { handleGetUser } from '../utils/helper'
import RegisterForm from './Auth/RegisterForm'
import { HowToRegOutlined, LogoutOutlined } from '@mui/icons-material'

const Navbar = ({ isLogout }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload();
    }

    return (
        <>
            <Box sx={
                {
                    position: "fixed",
                    display: 'flex',
                    alignItems: "center",
                    gap: "1rem",
                    top: "0px",
                    width: "100%",
                    left: "0px",
                    background: "white",
                    justifyContent: "space-between",
                    padding: "10px 20px",
                    boxSizing: "border-box"
                }
            }
            >
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
                    <Link style={{ color: "gray" }} to="/"><Typography variant='h5'>Menu</Typography></Link>
                    <Link style={{ color: "gray" }} to="/checkout"><Typography variant='h5'>Checkout</Typography></Link>
                    <Link style={{ color: "gray" }} to="/orders"><Typography variant='h5'>Orders</Typography></Link>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
                    {
                        isLogout && <Tooltip title="Register User">
                            <IconButton onClick={() => setIsOpen(true)}>
                                <HowToRegOutlined fontSize='large' />
                            </IconButton>
                        </Tooltip>
                    }
                    <Tooltip title="Logout">
                        <IconButton onClick={() => handleLogout()} >
                            <LogoutOutlined fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
            <RegisterForm isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}

export default Navbar