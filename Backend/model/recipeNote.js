const mongoose = require('mongoose');
const recipeNoteSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    timesCooked: Number,
    notes: Array,
    userId: mongoose.Schema.Types.ObjectId,
    recipeId: mongoose.Schema.Types.ObjectId
});

// Middleware
/*
noteSchema.pre('save', function(next){
    this.date_Updated = new Date();
    next();
});
*/

module.exports = mongoose.model('Note', recipeNoteSchema);