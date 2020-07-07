const router = require('express').Router();
const mongoose = require('mongoose');
const Achievement = require('../model/achievement');

router.get('/', (req, res)=>{
    Achievement.find().then(docs =>{
        res.status(200).json(docs);

    })
    .catch(err =>{
        res.status(500).json({error:err});
    });
});

router.get('/:achievementId', (req, res) => {
    Achievement.findById(req.params.achievementId)
    .then(doc =>{
        if(doc){
            res.status(200).json(doc);
        } else {
            res.status(404).json({msg:'Document not found with given ID'})
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(400).json({error: err});
    });
});

router.post('/', (req, res) => {
    const newAchievement = new Achievement({
        _id: new mongoose.Types.ObjectId,
        title: req.body.title,
        requirements: req.body.requirements,
        experience: req.body.experience
    });
    // Saves the given model to the database
    newAchievement.save((err) => {
        if(err){
            console.log(err);
            res.status(400).json({msg:`A field of data has not been filled in`});
        } else {
            res.status(200).json({msg:`Success! New achievement ${newAchievement.title} uploaded.`,newAchievement});
        }
    });
});

router.delete('/:achievementId', (req,res) => {
    Achievement.deleteOne({ _id : req.params.achievementId }).then(result =>{
        res.status(200).json(result);
    }).catch(err => {
        res.status(400).json({error:err});
    });
});

module.exports = router;