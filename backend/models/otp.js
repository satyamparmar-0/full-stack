const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
     mobileNumber: {
        type: String,
        required: true,
        unique: true,
    },
    otp: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
});

const Otp = mongoose.model('Otp', OtpSchema);

module.exports = Otp;
