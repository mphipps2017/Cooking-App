const mongoose = require('mongoose');
const recipeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    ingredients: Array,
    instructions: Array
});

module.exports = mongoose.model('Recipe', recipeSchema);