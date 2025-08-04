const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
require('dotenv').config();

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      throw new Error('You are not logged in! Please log in to get access.');
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);
    
    if (!currentUser) {
      throw new Error('The user belonging to this token does no longer exist.');
    }
    
    req.user = { id: currentUser._id };
    next();
  } catch (err) {
    res.status(401).json({
      status: 'fail',
      message: err.message
    });
  }
};