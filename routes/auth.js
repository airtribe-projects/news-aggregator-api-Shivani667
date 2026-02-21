const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/signup', register);
router.post('/login', login);

router.get('/profile', authenticateToken, (req, res) => {
    res.json({ message: 'This is your profile', user: req.user });
});

module.exports = router;