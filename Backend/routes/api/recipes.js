const express = require('express');
const router = express.Router();
const recipeModel =  require('../../model/recipes');

var count = 2; // Replace with real ID maker

router.get('/', (req, res) => {
    res.send(recipeModel);
});

router.get('/:id', (req,res)=>{
    res.send(recipeModel.filter(recipe => recipe.id === parseInt(req.params.id)));
});

router.post('/', (req, res) => {
    if(req.body.title !== '' && req.body.ingredients.length > 0 && req.body.instructions.length > 0){
        const newRecipe = {
            id: count,
            title: req.body,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions
        };
        recipeModel.push(newRecipe);
        count++;
        res.send(recipeModel);
    } else {
        res.status(400).json({msg:`A field of data has not been filled in`});
    }
});

router.put('/:id', (req, res) => {
    const found = recipeModel.some(recipe => recipe.id === parseInt(req.params.id));
    res.send(found);
    if(found && req.body.title !== '' && req.body.ingredients.length > 0 && req.body.instructions.length > 0){
        res.send(found);
    } else {
        res.status(400).json({msg:`A field of data has not been filled in`});
    }
});

module.exports = router;