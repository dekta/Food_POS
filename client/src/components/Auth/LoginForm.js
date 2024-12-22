import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../../services/apiService';
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, LinearProgress, TextField } from "@mui/material"

const LoginForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [loginOrSignup, setLoginOrSignup] = useState("login");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            await loginUser(formData); // Call the login API
            setTimeout(() => {
                window.location.reload()
            }, 500);
            navigate('/'); // Redirect to the menu page after login
        } catch (err) {
            setError('Login failed. Invalid email or password.');
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

                <DialogTitle>Login</DialogTitle>
                <DialogContent>
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
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='outlined'
                        onClick={() => navigate("/register")}>
                        Register
                    </Button>
                    <Button
                        variant='contained'
                        onClick={() => handleLogin()}>
                        {loading ? "Loading..." : "Login"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default LoginForm;
