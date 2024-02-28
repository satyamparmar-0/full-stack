// controllers/userController.js

const User = require('../models/otp');
const axios = require('axios');
const twilio = require('twilio');

const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

exports.sendOTP = async (req, res) => {
    try {
        const { name, mobileNumber } = req.body;

        // Create a new user
        const user = new User({
            name,
            mobileNumber,
            isVerified: false,
        });

        // Generate OTP
        const otp = generateOTP();

        // Save OTP to the user
        user.otp = otp;
        await user.save();

        // Send OTP via Twilio API
        const accountSid = 'ACdf1b66d0e44fda1d2b26c655e098128c';
        const authToken = 'e703e79317b512feaad6d67270a5f676';
        const twilioPhoneNumber = '+12108122734'; 
        const client = twilio(accountSid, authToken);

        const message = await client.messages.create({
            body: `Hello ${name}, your OTP for verification is: ${otp}`,
            from: twilioPhoneNumber,
            to: mobileNumber,
        });

        console.log('Message SID:', message.sid);
        res.send('OTP sent successfully!');

    } catch (error) {
        console.error('Error sending OTP:', error.message);
        res.status(500).send('Internal Server Error');
    }
};

exports.verifyOTP = async (req, res) => {
    try {
        const { mobileNumber, otp } = req.body;

        // Check if the provided OTP matches the one sent to the user's mobile number
        const user = await User.findOne({ mobileNumber, isVerified: false });

        if (!user) {
            return res.status(401).send('Invalid mobile number or user already verified');
        }

        // Check if the provided OTP matches the one sent to the user
        if (otp === user.otp) {
            // Mark the user as verified
            user.isVerified = true;
            await user.save();

           // res.send('OTP verification successful!');
           res.redirect('kyc');
        } else {
            res.status(401).send('Incorrect OTP');
        }
    } catch (error) {
        console.error('Error verifying OTP:', error.message);
        res.status(500).send('Internal Server Error');
    }
};
