// controllers/userController.js

const User = require('../models/users'); // Assuming your user model is in the models folder
const generateToken = require('../utils/tokens')
const { ObjectId } = require('mongoose').Types;


// Controller for rendering the signup form
exports.renderSignup = (req, res) => {
    res.render('signup');
};

// Controller for handling user signup
exports.signup = async (req, res) => {
    // Implement your user signup logic here
    try {
        // Extract user data from req.body
        const { username, email, password, role } = req.body;
    
        if (!['admin', 'normal'].includes(role)) {
            return res.status(400).send('Invalid role');
        }

        // Create a new user instance
        const newUser = new User({
            username,
            email,
            password,
            role,
        });
        
        // Save the user to the database
        await newUser.save();
        res.send('User signed up successfully!');
        
    } catch (error) {
        console.error('Error signing up:', error.message);
        res.status(500).send('Internal Server Error');
    }
};

// Controller for rendering the login form
exports.renderLogin = (req, res) => {
    res.render('login');
};

exports.login = async (req, res) => {
    try {
        // Extract user data from req.body
        const { email, password } = req.body;

        // Check if the user exists in the database
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if the provided password matches the stored password
        if (password !== user.password) {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }

        // Generate a token with user information, including the role
        //const token = generateToken({ id: user._id, username: user.username, role: user.role });

        // Redirect to the user profile route with the generated token
        res.redirect(`/profile?email=${user.email}`);
    } catch (error) {
        console.error('Error logging in:', error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.renderfind = (req,res)=>{
    res.render('/kyc')
};


exports.finding = async (req, res) => {
    try {
        const username = req.params.username;

        // Check if username is not provided
        if (!username) {
            return res.status(400).json({ success: false, message: 'Username not provided' });
        }

        // Find the user by username
        const user = await User.findOne({ username });
        
        if (!user) {
            return res.json({ success: false, message: 'The user is not registered' });
        }

        res.json({ success: true, message: `The user is ${user}` });
    } catch (error) {
        console.log(error, 'Error on finding the data');
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// In your profile controller
exports.renderUserProfile = async (req, res) => {
    const userEmail = req.query.email;

    // Check if userEmail is not provided
    if (!userEmail) {
        return res.status(400).json({ success: false, message: 'User email not provided' });
    }

    try {
        // Use the userEmail to retrieve user data and render the profile page
        const user = await User.findOne({ email: userEmail });

        // Check if user is not found
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.render('profile', { user });
    } catch (error) {
        console.error('Error querying user:', error.message);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

