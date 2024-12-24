import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../../services/apiService';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

const RegisterForm = ({ isOpen, setIsOpen }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    accessType: { create: false, update: false, delete: false },
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    try {
      const transformedAccessType = Object.entries(formData.accessType)
            .filter(([key, value]) => value)
            .map(([key]) => key);
      transformedAccessType.push('read') 
      const payload = { ...formData, accessType: transformedAccessType };
      await registerUser(payload);
      setIsOpen(false);
    } catch (err) {
      const error = err?.response?.data?.error || 'Registration failed. Please try again.'
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        accessType: {
          ...formData.accessType,
          [name]: checked,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    return () => {
      setFormData({
        name: '',
        email: '',
        password: '',
        role: '',
        accessType: { create: false, update: false, delete: false },
      });
    };
  }, []);

  return (
    <Box>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        {loading && <LinearProgress />}
        <DialogTitle>Welcome to Food POS</DialogTitle>
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            width: '500px',
          }}
        >
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
          <Box>
            <InputLabel id="role">Role</InputLabel>
            <Select
              id="role"
              onChange={handleChange}
              name="role"
              sx={{ width: '100%' }}
              placeholder="Role"
              label="Role"
              value={formData?.role}
            >
              <MenuItem value="staff">Staff</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </Box>
          <Box sx={{ marginTop: '1rem' }}>
            <FormLabel
              component="legend"
              sx={{ marginBottom: '0.5rem', fontWeight: 'bold' }}
            >
              Permissions
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.accessType.create}
                    onChange={handleChange}
                    name="create"
                  />
                }
                label="Create"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.accessType.update}
                    onChange={handleChange}
                    name="update"
                  />
                }
                label="Update"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.accessType.delete}
                    onChange={handleChange}
                    name="delete"
                  />
                }
                label="Delete"
              />
            </FormGroup>
          </Box>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => handleSignup()}>
            {loading ? 'Loading...' : 'Signup'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RegisterForm;
