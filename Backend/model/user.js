const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    level: Number,
    Achievements: Array
    // Add one for what dishes this user has cooked and how many they have cooked.
});

module.exports = mongoose.model('User', UserSchema);