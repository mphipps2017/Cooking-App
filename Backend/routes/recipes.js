const router = require('express').Router();
const mongoose = require('mongoose');

const Recipe = require('../model/recipe'); // Change to /recipes when fully implemented

router.get('/', (req, res) => {
    // Grabs all recipes
    Recipe.find().then(docs =>{
        res.status(200).json(docs);

    })
    .catch(err =>{
        res.status(500).json({error:err});
    });
});

router.get('/:recipeId', (req,res)=>{
    // Finds the givens an object of the given model by it's id
    Recipe.findById(req.params.recipeId)
    .then(doc =>{
        if(doc){
            res.status(200).json(doc);
        } else {
            res.status(404).json({msg:'Document not found with given ID'})
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.post('/', (req, res) => {
    if(req.body.title !== '' && req.body.ingredients.length > 0 && req.body.instructions.length > 0){
        const newRecipe = new Recipe({
            _id: new mongoose.Types.ObjectId,
            title: req.body.title,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            toolsRequired: req.body.tools,
            dishOrigin: req.body.origin,
            difficulty: req.body.difficulty
        });
        // Saves the given model to the database
        newRecipe.save((result) => {
            res.send(newRecipe);
        });
    } else {
        res.status(400).json({msg:`A field of data has not been filled in`});
    }
});

router.patch('/:recipeId', (req, res) => {
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    // Sets only the values listed in updateOps
    Recipe.update({ _id : req.params.recipeId }, { $set: updateOps}).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({error:err});
    });
});

router.delete('/:recipeId', (req, res) => {
    // Removes the document with ID given for this model from the DB
    Recipe.remove({ _id : req.params.recipeId }).then(result =>{
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({error:err});
    });
});

module.exports = router;