const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        throw error; // Rethrow the error so that it can be caught in the app.js
    }
};

module.exports = connectToDatabase;
