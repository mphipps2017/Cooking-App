const router = require('express').Router();
const mongoose = require('mongoose');

const Note = require('../model/note');
const User = require('../model/user');

router.get('/all', (req, res) => {
    Note.find().then(docs =>{
        res.status(200).json(docs);

    })
    .catch(err =>{
        res.status(500).json({error:err});
    });
});

router.get('/byId/:noteId', (req, res)=>{
    Note.findById(req.params.noteId)
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

router.get('/doubleId', (req, res)=>{
    Note.find({
        userId: new mongoose.mongo.ObjectId(req.body.userId),
        recipeId: new mongoose.mongo.ObjectId(req.body.recipeId)
    }).then(noteDoc =>{
        if(noteDoc){
            res.status(200).json(noteDoc);
        } else {
            res.status(404).json({msg:'Could not find a note with the given properties'});
        }
    }).catch(err=>{
        res.status(400).json({msg:'Input fields missing or incorrect length'});
    });
});

// Need userId recipeId content of note and recipe name
router.post('/', (req, res) => {
    const newNote = new Note({
        _id: new mongoose.Types.ObjectId,
        content: req.body.content,
        userId: new mongoose.mongo.ObjectId(req.body.userId),
        recipeId: new mongoose.mongo.ObjectId(req.body.recipeId)
    });
    // Saves the given model to the database
    newNote.save((err) => {
        if(err){
            console.log(err);
            res.status(400).json({msg: 'Could not upload new note :('});
        } else {
            // TODO need to update user with notes that are created (fiugre out good way to do that)
            res.status(200).json({msg: `Successfully added a new note!`, newNote});
        }
    });
});

router.patch('/updateContent/:noteId', (req,res)=>{
    Note.updateOne({_id:req.params.noteId}, {$set:{content:req.body.content, date_Updated: new Date()}})
    .then(result=>{
        res.status(200).json(result);
    })
    .catch(err=>{
        res.status(400).json({msg:'Something went wrong :(', err});
    });
});

router.patch('/deleteNote', (req,res)=>{});

module.exports = router;