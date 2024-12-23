const express = require('express')
const {
  register,
  login,
  customerRegister
} = require('../controllers/authController')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/register/customer', customerRegister)

module.exports = router
