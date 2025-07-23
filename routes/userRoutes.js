const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authMiddleware } = require('../middleware/authMiddleware');

// ✅ Get logged-in user's profile
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching profile' });
  }
});

// ✅ Update logged-in user's profile
router.put('/me', authMiddleware, async (req, res) => {
  try {
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      updates,
      { new: true, runValidators: true }
    ).select('-password');
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating profile' });
  }
});

// ✅ NEW: List available donors
router.get('/', authMiddleware, async (req, res) => {
  try {
    const donors = await User.find({ isDonor: true, availability: true }).select('-password');
    res.status(200).json(donors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching donors' });
  }
});

module.exports = router;
