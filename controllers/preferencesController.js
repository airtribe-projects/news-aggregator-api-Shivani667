const authController = require('./authController');
const users = authController.users;

const setPreferences = (req, res) => {
    const { preferences } = req.body;
    const email = req.user.email; 

    if (!preferences || !Array.isArray(preferences)) {
        return res.status(400).json({ error: 'Preferences must be an array' });
    }

    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    user.preferences = preferences;
    res.status(200).json({ message: 'Preferences updated successfully', preferences });
};

const getPreferences = (req, res) => {
    const email = req.user.email;
    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ preferences: user.preferences });
};

module.exports = { setPreferences, getPreferences };