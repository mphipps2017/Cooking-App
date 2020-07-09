const router = require('express').Router();

router.use('/recipes', require('./recipes'));
router.use('/users', require('./users'));
router.use('/achievements', require('./achievements'));
router.use('/recipeNotes', require('./recipeNotes'));

module.exports = router;