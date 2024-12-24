import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { handleGetUser } from '../utils/helper';
import RegisterForm from './Auth/RegisterForm';
import { HowToRegOutlined, LogoutOutlined } from '@mui/icons-material';

const Navbar = ({ isLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          top: '0px',
          width: '100%',
          left: '0px',
          background: 'rgba(92, 230, 120, 0.63)',
          justifyContent: 'space-between',
          padding: '10px 20px',
          boxSizing: 'border-box',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <Link style={{ color: 'black', textDecoration: 'none' }} to="/">
            <Typography variant="h6">Menu</Typography>
          </Link>
          <Link
            style={{ color: 'black', textDecoration: 'none' }}
            to="/checkout"
          >
            <Typography variant="h6">Checkout</Typography>
          </Link>
          <Link style={{ color: 'black', textDecoration: 'none' }} to="/orders">
            <Typography variant="h6">Orders</Typography>
          </Link>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          {isLogout && (
            <Tooltip title="Register Staff">
              <IconButton
                sx={{ color: 'black' }}
                onClick={() => setIsOpen(true)}
              >
                <HowToRegOutlined fontSize="large" />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Logout">
            <IconButton sx={{ color: 'black' }} onClick={() => handleLogout()}>
              <LogoutOutlined fontSize="large" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <RegisterForm isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Navbar;
