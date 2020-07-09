const mongoose = require('mongoose');
const noteSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date_Updated: Date,
    content: String,
    userId: mongoose.Schema.Types.ObjectId,
    recipeId: mongoose.Schema.Types.ObjectId
});

// Middleware
noteSchema.pre('save', function(next){
    this.date_Updated = new Date();
    next();
});

module.exports = mongoose.model('Note', noteSchema);