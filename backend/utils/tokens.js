// utils/token.js

const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    return jwt.sign(payload, 'your_secret_key', { expiresIn: '1h' }); // Replace 'your_secret_key' with your actual secret key
};

module.exports = generateToken;
