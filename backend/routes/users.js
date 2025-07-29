const express = require('express');
const User = require('../models/User');
const Course = require('../models/Course');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select('-password')
      .populate('enrolledCourses', 'title description thumbnail');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's enrolled courses
router.get('/courses', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate({
      path: 'enrolledCourses',
      populate: {
        path: 'instructor',
        select: 'name email'
      }
    });
    res.json(user.enrolledCourses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;