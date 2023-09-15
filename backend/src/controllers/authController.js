const User = require('../models/UserModel');
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const secretKey = "secretKey";


exports.signup = async (req, res) => {
    try {

        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(400).json({ message: 'This email address is already registered.' });
        }

        const hashedPassword = md5(req.body.password);

        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
        });

        await user.save();
        res.status(201).json({ message: 'User signed up successfully'});

    } catch (error) {
        console.error('Error in signup:', error);
        res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
};


exports.login = async (req, res) => {
    try {
        const foundUser = await User.findOne({ email: req.body.email });

        if (!foundUser) {
            return res.status(400).json({ message: 'User not found.' });
        }

        const isPasswordValid = foundUser.password === md5(req.body.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Incorrect password.' });
        }

        const payload = {
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            email: foundUser.email,
        };

        const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

        res.status(200).json({ message: "User logged in successfully", token: token });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
};
