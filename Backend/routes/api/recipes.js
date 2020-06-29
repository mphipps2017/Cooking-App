const express = require('express');
const router = express.Router();

module.exports = router;

router.get('/', (req, res) => {
    res.send('Hello world!');
});

router.post('/', (req, res) => {
    res.send(req.body);
    // Title = ''
    // Ingedients = []
    // Instructions = ['', '', .... , '']
});

