const mongoose = require('mongoose');
const achievementSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type:String, required: true},
    requirements: {type:Array, required: true},
    experience: {type:Number, required: true} // this would be experience granted upon attainment
});

module.exports = mongoose.model('Recipe', achievementSchema);