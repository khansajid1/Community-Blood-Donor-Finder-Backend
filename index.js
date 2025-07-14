// 1) Import required packages
const express = require('express');          // Express framework for API routes
const mongoose = require('mongoose');        // MongoDB ODM
const cors = require('cors');                // Handle cross-origin requests
require('dotenv').config();                  // Load .env variables

// 2) Import routes
const authRoutes = require('./routes/authRoutes');          // Register & login
const requestRoutes = require('./routes/requestRoutes');    // Blood requests
const userRoutes = require('./routes/userRoutes');

// 3) Initialize Express app
const app = express();

// 4) Middlewares
app.use(cors());
app.use(express.json());

// 5) Register API routes
app.use('/api/auth', authRoutes);            // ✅ Auth endpoints
app.use('/api/requests', requestRoutes);     // ✅ Requests endpoints
app.use('/api/users', userRoutes);

// 6) Basic health check route
app.get('/', (req, res) => {
  res.send('Community Blood Donor Finder API is running ✅');
});

// 7) Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bloodfinder', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// 8) Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
