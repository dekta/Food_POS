const User = require('../models/userModal');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const user = new User({ name, email, password, role });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error registering user' });
    }
};

const login = async (req, res) => {
    console.log("stdout")
    try {
        const { email, password } = req.body;
        console.log('email:', email)
        console.log('password:', password)
        const user = await User.findOne({ email });
        console.log('user:', user);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.log('err:', err)
        res.status(500).json({ error: 'Error logging in' });
    }
};

module.exports = { register, login };
