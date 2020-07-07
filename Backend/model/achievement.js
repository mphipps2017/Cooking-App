const mongoose = require('mongoose');

const achievementSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type:String, required: true},
    requirements: {type:Array, required: true, validate: checkRequirements},
    experience: {type:Number, required: true} // this would be experience granted upon attainment
});

// VALIDATION

function checkRequirements(requirements){
    if(requirements.length < 1){
        return false;
    }
    return true;
}

module.exports = mongoose.model('Achievement', achievementSchema);