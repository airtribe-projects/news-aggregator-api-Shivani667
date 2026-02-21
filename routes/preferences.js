const express = require('express');
const router = express.Router();
const { setPreferences, getPreferences } = require('../controllers/preferencesController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/preferences', authenticateToken, getPreferences);
router.put('/preferences', authenticateToken, setPreferences);



module.exports = router;