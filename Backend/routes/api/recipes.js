const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const recipeModel =  require('../../model/recipes');

const Recipe = require('../../model/recipesMon'); // Change to /recipes when fully implemented

router.get('/', (req, res) => {
    res.send(recipeModel);
});

// https://www.youtube.com/watch?v=WDrU305J1yw Tutorial for setting up and using mongoose.
router.get('/:recipeId', (req,res)=>{
    Recipe.findById(req.params.recipeId)
    .then(doc =>{
        res.status(200).json(doc);
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
            console.log(result);
        });
        res.send(newRecipe);
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

router.delete('/:id', (req, res) => {
    var found = -1;
    for(var i = 0; i < recipeModel.length; i++){
        if(recipeModel[i].id === parseInt(req.params.id)){
            found = i;
            break;
        }
    }

    if(found !== -1){
        recipeModel.splice(found,1);
        res.send(recipeModel);
    } else {
        res.status(400).json({msg:`ID not found in DB`});
    }
});

module.exports = router;