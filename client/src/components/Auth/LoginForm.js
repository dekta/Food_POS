import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  loginUser,
  registerCustomer,
  registerUser
} from '../../services/apiService'
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  LinearProgress,
  TextField
} from '@mui/material'

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    try {
      await loginUser(formData) // Call the login API
      setTimeout(() => {
        window.location.reload()
      }, 500)
      navigate('/') // Redirect to the menu page after login
    } catch (err) {
      setError('Login failed. Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async () => {
    setLoading(true)
    try {
      await registerCustomer(registerData) // Call the registration API
      alert('Registration successful. Please log in.')
      setIsRegisterDialogOpen(false)
    } catch (err) {
      setError('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRegisterChange = e => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value })
  }

  const handleRegisterOpen = () => {
    setIsRegisterDialogOpen(true)
  }

  const handleRegisterClose = () => {
    setIsRegisterDialogOpen(false)
  }

  return (
    <Box>
      {/* Login Dialog */}
      <Dialog open onClose={() => {}}>
        {loading && <LinearProgress />}
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin='dense'
            id='email'
            name='email'
            label='Email Address'
            type='email'
            fullWidth
            variant='standard'
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            required
            margin='dense'
            id='password'
            name='password'
            label='Password'
            type='password'
            fullWidth
            variant='standard'
            value={formData.password}
            onChange={handleChange}
          />
          {error &&
            <p style={{ color: 'red' }}>
              {error}
            </p>}
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleRegisterOpen}>
            User Register
          </Button>
          <Button variant='contained' onClick={handleLogin}>
            {loading ? 'Loading...' : 'Login'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Register Dialog */}
      <Dialog open={isRegisterDialogOpen} onClose={handleRegisterClose}>
        <DialogTitle>User Registration</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin='dense'
            id='name'
            name='name'
            label='Name'
            type='text'
            fullWidth
            variant='standard'
            value={registerData.name}
            onChange={handleRegisterChange}
          />
          <TextField
            required
            margin='dense'
            id='email'
            name='email'
            label='Email Address'
            type='email'
            fullWidth
            variant='standard'
            value={registerData.email}
            onChange={handleRegisterChange}
          />
          <TextField
            required
            margin='dense'
            id='password'
            name='password'
            label='Password'
            type='password'
            fullWidth
            variant='standard'
            value={registerData.password}
            onChange={handleRegisterChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRegisterClose} color='secondary'>
            Cancel
          </Button>
          <Button variant='contained' color='primary' onClick={handleRegister}>
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default LoginForm
