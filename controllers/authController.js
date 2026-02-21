const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = [];

const register = async (req, res) => {
    const { name, email, password, preferences } = req.body;

     if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({ name, email, password: hashedPassword, preferences: preferences || [] });


    res.status(200).json({ message: 'User registered successfully' });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
};


module.exports = { register, login, users  };