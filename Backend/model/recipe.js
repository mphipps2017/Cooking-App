const mongoose = require('mongoose');
const recipeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type:String, required: true},
    ingredients: {type:Array, required: true},
    instructions: {type:Array, required: true},
    toolsRequired: {type:Array, required: true},
    dishOrigin: {type:String, required: true},
    difficulty: {type:Number, required: true, min:1, max:10},
    experience: {type:Number, required: true, min:0},
    tags: {type:Array}
});

module.exports = mongoose.model('Recipe', recipeSchema);