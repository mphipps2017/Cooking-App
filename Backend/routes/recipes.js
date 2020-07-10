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

router.get('/byId/:recipeId', (req,res)=>{
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
        res.status(400).json({error: err});
    });
});

// Input searches as [{propName: "propName", value:"Value to be searched by"}, {more filters....} ]
router.get('/filterSearch', (req, res)=>{
    const searchOps = {};
    for(const ops of req.body){
        if(ops.propName === 'title'){
            searchOps['$text'] = {'$search': ops.value};
        } else {
            searchOps[ops.propName] = ops.value;
        }
    }

    Recipe.find(searchOps, (err, recipes)=>{
        if(recipes && recipes.length > 0){
            res.status(200).json(recipes);
        } else {
            res.status(404).json({msg:'No docs found'});
        }
    }).catch(err =>{
        res.status(400).json({error:err});
    });
});

router.post('/', (req, res) => {
    const newRecipe = new Recipe({
        _id: new mongoose.Types.ObjectId,
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        toolsRequired: req.body.tools,
        dishOrigin: req.body.dishOrigin,
        difficulty: req.body.difficulty,
        experience: req.body.experience, // Experience given upon completion
        tags: (req.body.tags ? req.body.tags : [])
    });
    // Saves the given model to the database
    newRecipe.save((err) => {
        if(err){
            console.log(err);
            res.status(400).json({msg: 'Failed Validation'});
        } else {
            res.status(200).json({msg: `Successfully added a new ${newRecipe.title} recipe!`, newRecipe});
        }
    });
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
        res.status(400).json({error:err});
    });
});

router.delete('/:recipeId', (req, res) => {
    // Removes the document with ID given for this model from the DB
    Recipe.remove({ _id : req.params.recipeId }).then(result =>{
        res.status(200).json(result);
    }).catch(err => {
        res.status(400).json({error:err});
    });
});

module.exports = router;