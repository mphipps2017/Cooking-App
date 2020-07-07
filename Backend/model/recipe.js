const mongoose = require('mongoose');
const recipeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type:String, required: true},
    ingredients: {type:Array, required: true},
    instructions: {type:Array, required: true},
    toolsRequired: {type:Array, required: true},
    dishOrigin: {type:String, required: true},
    difficulty: {type:Number, required: true}
});

module.exports = mongoose.model('Recipe', recipeSchema);