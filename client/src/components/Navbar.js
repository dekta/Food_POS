import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Navbar = () => {
    const param = useParams();
    console.log('param:', param)
    return (<Box sx={{ position: "fixed", display: 'flex', alignItems: "center", gap: "1rem", top: "0px", width: "100%", padding: "1rem", left: "0px", background: "white" }}
    >
        <Link style={{ color: "gray" }} to="/"><Typography variant='h5'>Menu</Typography></Link>
        <Link style={{ color: "gray" }} to="/orders"><Typography variant='h5'>Orders</Typography></Link>
        <Link style={{ color: "gray" }} to="/checkout"><Typography variant='h5'>Checkout</Typography></Link>
    </Box>
    )
}

export default Navbar