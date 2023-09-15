const User = require('../models/UserModel');
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const secretKey = "secretKey";

// User signup controller
exports.signup = async (req, res) => {
    try {
        // Check if the user with the provided email already exists
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            // If a user with the same email exists, return a 400 Bad Request response
            return res.status(400).json({ message: 'This email address is already registered.' });
        }

        // Hash the user's password using MD5
        const hashedPassword = md5(req.body.password);

        // Create a new User object with the request data
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
        });

        // Save the new user to the database
        await user.save();

        // Log the successful signup
        console.log(`User signed up successfully: ${user.email}`);

        // Return a 201 Created response
        res.status(201).json({ message: 'User signed up successfully' });

    } catch (error) {
        // Handle any errors that occur during signup
        console.error('Error in signup:', error);
        // Return a 500 Internal Server Error response with an error message
        res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
};

// User login controller
exports.login = async (req, res) => {
    try {
        // Find the user with the provided email
        const foundUser = await User.findOne({ email: req.body.email });
        console.log(foundUser)
        console.log(req.body)

        if (!foundUser) {
            // If no user is found with the email, return a 400 Bad Request response
            return res.status(400).json({ message: 'User not found.' });
        }

        // Check if the provided password matches the stored hashed password
        const isPasswordValid = foundUser.password === md5(req.body.password);

        if (!isPasswordValid) {
            // If the password is incorrect, return a 400 Bad Request response
            return res.status(400).json({ message: 'Incorrect password.' });
        }

        // Create a payload for the JWT token
        const payload = {
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            email: foundUser.email,
        };

        // Generate a JWT token with the payload
        const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

        // Log the successful login
        console.log(`User logged in successfully: ${foundUser.email}`);

        // Return a 200 OK response with the token
        res.status(200).json({ message: "User logged in successfully", token: token });

    } catch (error) {
        // Handle any errors that occur during login
        console.error('Error in login:', error);
        // Return a 500 Internal Server Error response with an error message
        res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
};
