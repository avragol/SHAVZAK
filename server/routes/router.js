const express = require('express');
const router = express.Router();
const handleError = require('../utils/handleError');

router.use('/', (req, res) => {
    res.send("hello world!");
})

router.use((req, res) => handleError(res, 'api not found', 404));

module.exports = router;