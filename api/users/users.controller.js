const express = require('express');
const router = express.Router();

const usersHandler = require('./users.handler');

router.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = router;