const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const emailService=require('../services/email.service');




const register = async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;
    
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const user=await User.create({ name:name, email, password })


    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '3d' });

    res.cookie('token', token);

    res.status(201).json({ user:{
        id: user.user_id,
        name: user.name,
        email: user.email,
    }, token });
//    await emailService.sendRegistrationEmail(user.email, user.name);

};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    };
    const user = await User.findOne({ email }).select("+password");

    if(!user){
        return res.status(400).json({ message: 'User not found' });
    }

    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).json({ message: 'Invalid password or email' });
    }

    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.cookie('token', token);

    res.status(200).json({ user:{
        id: user.user_id,
        name: user.name,
        email: user.email,
    }, token });
      
}

module.exports = {
    register,
    login
};