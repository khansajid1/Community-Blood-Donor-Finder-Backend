const express = require('express');
const router = express.Router();
const Request = require('../models/Request');
const { authMiddleware } = require('../middleware/authMiddleware');

// POST a new blood request (protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const {
      patientName,
      bloodGroupNeeded,
      urgency = 'Medium',
      location,
      hospital,
      units,
      requiredDate,
      reason
    } = req.body;

    const newRequest = new Request({
      userId: req.user.userId,
      patientName,
      bloodGroupNeeded,
      urgency,
      location,
      hospital,
      units,
      requiredDate,
      reason
    });

    await newRequest.save();
    res.status(201).json({ message: 'Blood request posted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error posting blood request' });
  }
});

// GET all blood requests (public or protected)
router.get('/', async (req, res) => {
  try {
    const requests = await Request.find().populate('userId', 'name phone location bloodGroup');
    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching requests' });
  }
});

module.exports = router;
