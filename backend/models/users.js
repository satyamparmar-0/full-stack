const mongoose = require('mongoose');
const connectToDatabase = require('../connection');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    role:{
        type:String,
        enum:['admin','normal'],
        default:'normal',
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
    