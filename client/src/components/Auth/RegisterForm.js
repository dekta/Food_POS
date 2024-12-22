import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../../services/apiService';
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, InputLabel, LinearProgress, MenuItem, Select, TextField } from "@mui/material"

const RegisterForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: '' });
    console.log('formData:', formData)
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {

        setLoading(true);
        try {
            await registerUser(formData);
            navigate('/'); // Redirect to the menu page after successful registration
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
        finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Box>
            <Dialog
                open={true}
                onClose={() => { }}
            >
                {
                    loading && <LinearProgress />
                }
                <DialogTitle>Welcome to Food POS</DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "1rem", width: "500px" }}>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="name"
                        label="Full Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="email"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <InputLabel id="role">Role</InputLabel>
                    <Select
                        id="role"
                        onChange={handleChange}
                        name='role'
                        sx={{ width: "100%" }}
                        placeholder="Role"
                        label="Role"
                        value={formData?.role}
                    >
                        <MenuItem value="staff">Staff</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='outlined'
                        onClick={() => navigate("/login")}>
                        Login
                    </Button>
                    <Button
                        variant='contained'
                        onClick={() => handleSignup()}>
                        {loading ? "Loading..." : "Signup"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default RegisterForm;
