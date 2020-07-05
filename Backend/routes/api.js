const router = require('express').Router();

router.use('/recipes', require('./recipes'));
router.use('/auth', require('./auth/auth-api.js'));

module.exports = router;