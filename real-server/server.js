const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const mealRoutes = require('./routes/meals')
const cors = require('cors')

// Load environment variables
dotenv.config()

// Initialize Express app
const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // React app origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json())
app.use('/uploads', express.static('uploads'))

// Connect to MongoDB
connectDB()

// Routes
app.use('/meals', mealRoutes)

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
