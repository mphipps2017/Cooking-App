const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const recipeModel =  require('../../model/recipes');

const Recipe = require('../../model/recipesMon'); // Change to /recipes when fully implemented

router.get('/', (req, res) => {
    // Grabs all recipes
    Recipe.find().then(docs =>{
        res.status(200).json(docs);

    })
    .catch(err =>{
        res.status(500).json({error:err});
    });
});

// https://www.youtube.com/watch?v=WDrU305J1yw Tutorial for setting up and using mongoose.
router.get('/:recipeId', (req,res)=>{
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
            instructions: req.body.instructions
        });
        newRecipe.save((result) => {
            res.send(newRecipe);
        });
    } else {
        res.status(400).json({msg:`A field of data has not been filled in`});
    }
});

router.put('/:id', (req, res) => {
    const found = recipeModel.some(recipe => recipe.id === parseInt(req.params.id));
    if(found && req.body.title !== '' && req.body.ingredients.length > 0 && req.body.instructions.length > 0){
        recipeModel.forEach(recipe =>{
            if(recipe.id === parseInt(req.params.id)){
                recipe.title = req.body.title;
                recipe.ingredients = req.body.ingredients;
                recipe.instructions = req.body.instructions;
            }
        });
        res.send(recipeModel);
    } else {
        res.status(400).json({msg:`A field of data has not been filled in`});
    }
});

router.delete('/:recipeId', (req, res) => {
    Recipe.remove({_id: req.params.recipeId}).then(result =>{
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({error:err});
    });
});

module.exports = router;