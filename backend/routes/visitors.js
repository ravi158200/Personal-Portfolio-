const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');

// @route   POST /api/visitors
// @desc    Log a new visitor (Called automatically by frontend)
router.post('/', async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown IP';
    const userAgent = req.headers['user-agent'] || 'Unknown Device';
    
    // Parse a simplified device string from User-Agent
    let deviceStr = 'Desktop';
    if (userAgent.includes('Mobile') || userAgent.includes('Android') || userAgent.includes('iPhone')) {
      deviceStr = 'Mobile';
    } else if (userAgent.includes('Tablet') || userAgent.includes('iPad')) {
      deviceStr = 'Tablet';
    }

    let browserStr = 'Unknown Browser';
    if (userAgent.includes('Chrome')) browserStr = 'Chrome';
    else if (userAgent.includes('Firefox')) browserStr = 'Firefox';
    else if (userAgent.includes('Safari')) browserStr = 'Safari';
    else if (userAgent.includes('Edge')) browserStr = 'Edge';

    const newVisitor = new Visitor({
      ip,
      device: `${deviceStr} / ${browserStr}`,
      location: 'India (Demo)' // In production, use an IP Geolocation API here
    });

    await newVisitor.save();
    res.json({ success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/visitors
// @desc    Get all visitor logs for Admin Panel
router.get('/', async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({ visitedAt: -1 }).limit(100);
    res.json(visitors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
