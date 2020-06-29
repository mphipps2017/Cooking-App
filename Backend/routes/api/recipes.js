const express = require('express');
const router = express.Router();
const recipeModel =  require('../../model/recipes');

router.get('/', (req, res) => {
    res.send(recipeModel);
});

router.post('/', (req, res) => {
    if(req.body.title !== '' && req.body.ingredients.length > 0 && req.body.instructions.length > 0){
        const newRecipe = {
            id: Math.random(),
            title: req.body,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions
        };
        recipeModel.push(newRecipe);
        res.send(recipeModel);
    } else {
        res.status(400).json({msg:`A field of data has not been filled in`});
    }
});

module.exports = router;