require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes.js');
const postRoutes = require('./routes/postRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Linked Assignment Ciaan backend');
  });

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 5001
    app.listen(PORT, (err) => {
      if (err) {
        console.error('Error starting server:', err);
        process.exit(1);
      }
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.log(err));