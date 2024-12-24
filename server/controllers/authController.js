const User = require('../models/userModal');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    try {
        const { name, email, password, role,accessType } = req.body;
        const checkUser = await User.findOne({ email });
        if(checkUser){
            res.status(400).json({ error: 'User email already exists' });
        }else{
            const user = new User({ name, email, password, role,accessType});
            await user.save();
            res.status(201).json({ message: 'User registered successfully' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error registering user' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id, role: user.role ,accessType:user.accessType }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, name: user?.name, role: user?.role ,accessType:user?.accessType });
    } catch (err) {
        console.log('err:', err)
        res.status(500).json({ error: 'Error logging in' });
    }
};

const customerRegister = async (req, res) => {
    try {
        const { name, email, password} = req.body;
        const checkUser = await User.findOne({ email });
        if(checkUser){
            res.status(400).json({ error: 'User email already exists' });
        }else{
            const user = new User({ name, email, password, role:'customer'});
            await user.save();
            res.status(201).json({ message: 'User registered successfully' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error registering user' });
    }
};

module.exports = { register, login,customerRegister };
