const router = require('express').Router();
const mongoose = require('mongoose');

router.post('/', (req, res) => {
    if(req.body.title !== '' && req.body.ingredients.length > 0 && req.body.instructions.length > 0){
        const newAchievement = new Recipe({
            _id: new mongoose.Types.ObjectId,
            title: req.body.title,
            requirements: req.body.requirements,
            experience: req.body.experience
        });
        // Saves the given model to the database
        newAchievement.save((result) => {
            res.send({msg:`Success! New achievement ${req.body.title} uploaded.`,newAchievement});
        });
    } else {
        res.status(400).json({msg:`A field of data has not been filled in`});
    }
});

module.exports = router;