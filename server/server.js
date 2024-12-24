const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/db') // Change import to require
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const menuRoutes = require('./routes/menuRoutes')
const orderRoutes = require('./routes/orderRoutes')

const app = express()
// Allow requests from a specific origin
app.use(
  cors({
    origin: 'https://food-pos-project.netlify.app/',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
)

app.use(bodyParser.json())

app.use('/api/auth', authRoutes)
app.use('/api/menu', menuRoutes)
app.use('/api/orders', orderRoutes)

app.listen(process.env.PORT || 8000, async () => {
  console.log(`Server running on port ${process.env.PORT || 8000}`)
  console.log('⏳ Database connecting...')
  try {
    await connectDB()
    console.log('✅ Database connected.')
  } catch (error) {
    console.log('❌ Error:', error)
  }
})
