const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema({
  ip: {
    type: String,
    default: 'Unknown IP'
  },
  device: {
    type: String,
    default: 'Unknown Device'
  },
  location: {
    type: String,
    default: 'Local Network'
  },
  visitedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Visitor', VisitorSchema);
