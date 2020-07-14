const router = require('express').Router();
const mongoose = require('mongoose');

const recipeNote = require('../model/recipeNote');
const User = require('../model/user');

router.get('/all', (req, res) => {
    recipeNote.find().then(docs =>{
        res.status(200).json(docs);

    })
    .catch(err =>{
        res.status(500).json({error:err});
    });
});

// Find note by Id
router.get('/byId/:noteId', (req, res)=>{
    recipeNote.findById(req.params.noteId)
    .then(noteDoc =>{
        if(noteDoc){
            res.status(200).json(noteDoc);
        } else{
            res.status(404).json({msg:`Could not find document with given id`});
        }
    }).catch(err =>{
        res.status(400).json({msg:`Invalid input`});
    });
});

// Fine a note based on recipeId and userId
router.get('/doubleId', (req, res)=>{
    recipeNote.find({
        userId: new mongoose.mongo.ObjectId(req.body.userId),
        recipeId: new mongoose.mongo.ObjectId(req.body.recipeId)
    }).then(noteDoc =>{
        if(noteDoc){
            res.status(200).json(noteDoc);
        } else {
            res.status(404).json({msg:'Could not find a recipeNote with the given properties'});
        }
    }).catch(err=>{
        res.status(400).json({msg:'Input fields missing or incorrect length'});
    });
});

// Creates a new blank recipeNote for this recipe / user
router.post('/', (req, res) => {
    const newNote = new recipeNote({
        _id: new mongoose.Types.ObjectId,
        timesCooked: req.body.timesCooked,
        notes: req.body.notes,
        userId: new mongoose.mongo.ObjectId(req.body.userId),
        recipeId: new mongoose.mongo.ObjectId(req.body.recipeId)
    });
    // Saves the given model to the database
    newNote.save((err) => {
        if(err){
            console.log(err);
            res.status(400).json({msg: 'Could not upload new note :('});
        } else {
            res.status(200).json({msg: `Successfully added a new note!`, newNote});
        }
    });
});

// Creates a new note for this recipeNote
router.patch('/createNote/:recipeNoteId', (req,res)=>{
    recipeNote.updateOne({_id:req.params.recipeNoteId}, 
        {$push:{notes:{content:req.body.content, dateCreated: new Date()}}})
    .then(result=>{
        res.status(200).json(result);
    })
    .catch(err=>{
        res.status(400).json({msg:'Something went wrong :(', err});
    });
});

// Update a note in the array (need to inout whole array into request)
router.patch('/updateNote/:recipeNoteId', (req,res)=>{
    recipeNote.updateOne({_id:req.params.recipeNoteId}, {$set:{notes:req.body.notes}})
    .then(result =>{
        res.status(200).json(result);
    }).catch(err=>{
        res.status(400).json(err);
    });
});

// Include user id in request body
// Include experience gained from recipe in body
router.patch('/incrementTimesCooked/:noteId', (req,res)=>{
    recipeNote.updateOne({_id:req.params.noteId}, {$inc:{timesCooked:1}}).then(result =>{
        User.updateOne({_id:req.body.userId}, 
                {$inc:{totalDishesCooked:1, 
                experience: req.body.exp}, 
                lastCookedMeal: {date:new.Date(), recipeId:req.body.recipeId, title:req.body.recipeTitle}})
            .then(finRes =>{
            res.status(200).json({result,finRes});
        });
    }).catch(err=>{
        res.status(400).json(err);
    });
});

router.patch('/deleteNote', (req,res)=>{});

module.exports = router;