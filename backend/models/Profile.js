const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  heroText: {
    type: String,
    required: true
  },
  aboutText: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  resumeUrl: {
    type: String,
    default: null
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Profile', ProfileSchema);
