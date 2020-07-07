const mongoose = require('mongoose');
const achievementSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    requirements: Array,
    experience: Number // this would be experience granted upon attainment
});

module.exports = mongoose.model('Recipe', achievementSchema);