const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// @route   GET /api/profile
// @desc    Get profile data
router.get('/', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      // Create default profile if none exists
      profile = new Profile({
        heroText: "This is a personal portfolio website designed and developed to showcase my skills, projects, and professional journey as a web developer. The website highlights my work, technical expertise, and provides a platform for visitors to explore my projects and contact me.\n\nThe portfolio includes multiple sections such as Home, About, Skills, Projects, Services, and Contact, allowing users to easily navigate and learn more about my development experience.",
        aboutText: "My portfolio is built with the following core features:\n• Admin dashboard to manage projects\n• Blog section for sharing knowledge\n• Project filtering system\n• Analytics dashboard for visitor insights\n\nMy goals and objectives:\n• Build a strong personal brand as a developer\n• Showcase real-world projects and technical skills\n• Provide an online resume for recruiters and clients\n• Improve web development and UI design skills\n• Create opportunities for freelance work and collaborations",
        image: "D:/Ravi kumar/Ravi.jpg"
      });
      await profile.save();
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/profile
// @desc    Update profile data
router.post('/', async (req, res) => {
  try {
    const { heroText, aboutText, image, resumeUrl } = req.body;
    let profile = await Profile.findOne();
    
    if (profile) {
      profile.heroText = heroText || profile.heroText;
      profile.aboutText = aboutText || profile.aboutText;
      profile.image = image || profile.image;
      profile.resumeUrl = resumeUrl || profile.resumeUrl;
      profile.updatedAt = Date.now();
      await profile.save();
    } else {
      profile = new Profile({ heroText, aboutText, image, resumeUrl });
      await profile.save();
    }
    
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
