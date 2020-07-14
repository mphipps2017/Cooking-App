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
        required: true,
        validate: validateEmail
    },
    experience: Number,
    achievements: Array, // Contains objects [{'achivementId': _id, 'achievementName': title},...]
    tools: Array, // [toolName]
    totalDishesCooked: Number,
    favoriteRecipes: Array, // Contains [{recipeID, recipeName},{}....]
    lastCookedMeal: Object // Contains [{DateCooked, RecipeID, recipeName}]
});

// VALIDATION

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

module.exports = mongoose.model('User', UserSchema);